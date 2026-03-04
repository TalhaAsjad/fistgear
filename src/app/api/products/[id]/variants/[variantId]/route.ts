import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { productVariant } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { updateVariantSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string; variantId: string }> };

// PUT /api/products/[id]/variants/[variantId] — update a variant (admin only)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { id, variantId } = await params;
    const body = await request.json();
    const parsed = updateVariantSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(productVariant)
      .set({
        ...parsed.data,
        updatedAt: new Date(),
      })
      .where(
        and(eq(productVariant.id, variantId), eq(productVariant.productId, id))
      )
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Variant not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/products/[id]/variants/[variantId] error:", error);
    return NextResponse.json(
      { error: "Failed to update variant." },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/variants/[variantId] — delete a variant (admin only)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { id, variantId } = await params;

    const [deleted] = await db
      .delete(productVariant)
      .where(
        and(eq(productVariant.id, variantId), eq(productVariant.productId, id))
      )
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: "Variant not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(deleted);
  } catch (error) {
    console.error(
      "DELETE /api/products/[id]/variants/[variantId] error:",
      error
    );
    return NextResponse.json(
      { error: "Failed to delete variant." },
      { status: 500 }
    );
  }
}
