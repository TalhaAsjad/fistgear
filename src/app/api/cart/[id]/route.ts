import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cartItem, productVariant } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { updateCartItemSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

// PUT /api/cart/[id] — update cart item quantity (atomic with stock check)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = updateCartItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // Transaction with FOR UPDATE locks to prevent race conditions
    const result = await db.transaction(async (tx) => {
      // Lock cart item row — compound where ensures ownership
      const [existing] = await tx
        .select()
        .from(cartItem)
        .where(and(eq(cartItem.id, id), eq(cartItem.userId, session.user.id)))
        .for("update");

      if (!existing) {
        return { error: "Cart item not found.", status: 404 } as const;
      }

      // Lock variant row and check stock
      const [variant] = await tx
        .select()
        .from(productVariant)
        .where(eq(productVariant.id, existing.variantId))
        .for("update");

      if (!variant || variant.stock < parsed.data.quantity) {
        return { error: "Insufficient stock.", status: 400 } as const;
      }

      const [updated] = await tx
        .update(cartItem)
        .set({
          quantity: parsed.data.quantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItem.id, id))
        .returning();

      return { data: updated } as const;
    });

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("PUT /api/cart/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update cart item." },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[id] — remove a cart item
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;

    const [deleted] = await db
      .delete(cartItem)
      .where(
        and(eq(cartItem.id, id), eq(cartItem.userId, session.user.id))
      )
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: "Cart item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/cart/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to remove cart item." },
      { status: 500 }
    );
  }
}
