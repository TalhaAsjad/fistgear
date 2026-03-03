import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/products — list all active products with their variants
export async function GET() {
  try {
    const products = await db.query.product.findMany({
      where: eq(product.isActive, true),
      with: { variants: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}

// POST /api/products — create a new product (admin only)
export async function POST(request: Request) {
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

    const body = await request.json();
    const { name, description, category, brand, imageUrl } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and category are required." },
        { status: 400 }
      );
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      description: description || null,
      category,
      brand: brand || null,
      imageUrl: imageUrl || null,
    };

    const [created] = await db.insert(product).values(newProduct).returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}
