import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";

// GET /api/products/all — list ALL products including inactive (admin only)
export async function GET(request: Request) {
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

    const products = await db.query.product.findMany({
      with: { variants: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products/all error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
