
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { CompanyRegistration } from "@/entities/CompanyRegistration";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
     const { id } = await params;
     const db = await getDb();
     
     const company = await db.getRepository(CompanyRegistration).findOne({
         where: { id }
     });

     if (!company) {
         return NextResponse.json({ success: false, message: "Company not found" }, { status: 404 });
     }

     return NextResponse.json({ success: true, data: company });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { companyName, companyType, companyLogoUrl } = body;

        const db = await getDb();
        const repo = db.getRepository(CompanyRegistration);

        if (!companyName) {
            return NextResponse.json({ success: false, message: "Company name is required" }, { status: 400 });
        }

        await repo.update(id, {
            companyName,
            companyType,
            companyLogoUrl
        });
        
        const updated = await repo.findOne({ where: { id } });

        return NextResponse.json({ success: true, data: updated });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
