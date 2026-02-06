
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Invoice } from "@/entities/Invoice";

export async function GET() {
  try {
    const db = await getDb();
    const invoices = await db.getRepository(Invoice).find({
      relations: ["user"],
      order: { createdAt: 'DESC' }
    });
    return NextResponse.json({ success: true, data: invoices });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching invoices" }, { status: 500 });
  }
}
