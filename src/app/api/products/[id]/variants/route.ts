import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { productVariant } from "@/db/schema";
import { createVariantSchema } from "@/lib/validations";

// POST /api/products/[id]/variants — create a variant (admin only)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const parsed = createVariantSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const [created] = await db
      .insert(productVariant)
      .values({
        id: crypto.randomUUID(),
        productId: id,
        ...parsed.data,
      })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/products/[id]/variants error:", error);
    return NextResponse.json(
      { error: "Failed to create variant." },
      { status: 500 }
    );
  }
}
