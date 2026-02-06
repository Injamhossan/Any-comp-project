
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { CompanyRegistration } from "@/entities/CompanyRegistration";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    
    const registrations = await db.getRepository(CompanyRegistration).find({
        relations: ["user"],
        order: {
            createdAt: 'DESC'
        }
    });

    return NextResponse.json({ success: true, data: registrations });

  } catch (error: any) {
    console.error("Admin Clients API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ success: false, message: "Missing id or status" }, { status: 400 });
        }

        const db = await getDb();
        const repo = db.getRepository(CompanyRegistration);
        
        await repo.update(id, { status });
        const updated = await repo.findOne({ where: { id } });

        return NextResponse.json({ success: true, data: updated });
    } catch (error: any) {
        console.error("Update Status Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
