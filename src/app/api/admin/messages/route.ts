
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Message } from "@/entities/Message";

export async function GET() {
  try {
    const db = await getDb();
    const messages = await db.getRepository(Message).find({
      order: { createdAt: 'DESC' }
    });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const db = await getDb();
        const repo = db.getRepository(Message);
        const message = repo.create(body);
        await repo.save(message);
        return NextResponse.json({ success: true, data: message });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error sending message" }, { status: 500 });
    }
}
