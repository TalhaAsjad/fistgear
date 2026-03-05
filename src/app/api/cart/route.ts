import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cartItem, productVariant } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { addToCartSchema } from "@/lib/validations";

// GET /api/cart — load the authenticated user's cart with variant + product data
export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const items = await db.query.cartItem.findMany({
      where: eq(cartItem.userId, session.user.id),
      with: { variant: { with: { product: true } } },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart." },
      { status: 500 }
    );
  }
}

// POST /api/cart — add a variant to cart (atomic upsert with stock check)
export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const parsed = addToCartSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // Transaction with FOR UPDATE locks to prevent race conditions
    const result = await db.transaction(async (tx) => {
      // Lock variant row — blocks concurrent reads until this tx commits
      const [variant] = await tx
        .select()
        .from(productVariant)
        .where(eq(productVariant.id, parsed.data.variantId))
        .for("update");

      if (!variant) {
        return { error: "Variant not found.", status: 404 } as const;
      }

      // Lock existing cart item row (if any)
      const [existing] = await tx
        .select()
        .from(cartItem)
        .where(
          and(
            eq(cartItem.userId, session.user.id),
            eq(cartItem.variantId, parsed.data.variantId)
          )
        )
        .for("update");

      if (existing) {
        if (variant.stock < existing.quantity + 1) {
          return { error: "Insufficient stock.", status: 400 } as const;
        }

        const [updated] = await tx
          .update(cartItem)
          .set({
            quantity: existing.quantity + 1,
            updatedAt: new Date(),
          })
          .where(eq(cartItem.id, existing.id))
          .returning();

        return { data: updated, status: 201 } as const;
      }

      if (variant.stock < 1) {
        return { error: "Out of stock.", status: 400 } as const;
      }

      const [created] = await tx
        .insert(cartItem)
        .values({
          id: crypto.randomUUID(),
          userId: session.user.id,
          variantId: parsed.data.variantId,
        })
        .returning();

      return { data: created, status: 201 } as const;
    });

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json(
      { error: "Failed to add to cart." },
      { status: 500 }
    );
  }
}
