
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const db = prisma as any;

    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
         return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, name, phone } = body; // Assume phone might be added later to schema

        if (!email) return NextResponse.json({ success: false }, { status: 400 });

        const db = prisma as any;

        const user = await db.user.update({
            where: { email },
            data: {
                name,
                photo_url: body.photo_url || body.photoUrl // Accept both casing
            }
        });

        return NextResponse.json({ success: true, data: user });
    } catch(err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
