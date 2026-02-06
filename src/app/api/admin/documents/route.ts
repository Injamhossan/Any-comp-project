
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Document } from "@/entities/Document";

export async function GET() {
  try {
    const db = await getDb();
    const documents = await db.getRepository(Document).find({
      relations: ["user"],
      order: { createdAt: 'DESC' }
    });
    return NextResponse.json({ success: true, data: documents });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching documents" }, { status: 500 });
  }
}
