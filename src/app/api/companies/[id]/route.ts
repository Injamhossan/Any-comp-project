import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
     const { id } = await params;
     
     const company = await prisma.companyRegistration.findUnique({
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

        if (!companyName) {
            return NextResponse.json({ success: false, message: "Company name is required" }, { status: 400 });
        }

        const updated = await prisma.companyRegistration.update({
            where: { id },
            data: {
              companyName,
              companyType,
              companyLogoUrl
            }
        });

        return NextResponse.json({ success: true, data: updated });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
