
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "Please sign in to view market prices." },
        { status: 401 }
      );
    }

    const response = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products?category=chal",
      { cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Could not fetch market prices." },
        { status: 502 }
      );
    }

    const data: unknown = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Market API error:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
