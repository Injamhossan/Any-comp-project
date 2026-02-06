
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Order } from "@/entities/Order";

export async function GET() {
  try {
    const db = await getDb();
    const orders = await db.getRepository(Order).find({
      relations: ["user", "specialist"],
      order: {
        createdAt: 'DESC'
      }
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
