import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const name = searchParams.get('name');  

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email },
      include: { registrations: true }
    });

    if (!user) {
       user = await prisma.user.create({
            data: {
                email,
                name: name || email.split('@')[0],
                role: 'USER'
            },
            include: { registrations: true }
       });
       return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: user.registrations || [] });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
      const body = await req.json();
      const { email, companyName, companyType, companyLogoUrl } = body;

      if (!email || !companyName) {
           return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
      }

      let user = await prisma.user.findUnique({ 
          where: { email },
          include: { registrations: true }
      });
      
      if (!user) {
          user = await prisma.user.create({
               data: { email, role: 'USER' },
               include: { registrations: true }
          });
      }

      if (user.registrations && user.registrations.length > 0) {
          return NextResponse.json({ 
              success: false, 
              message: "Limit Reached: You have already registered a company. Only one company registration is allowed per user." 
          }, { status: 400 });
      }

      const registration = await prisma.companyRegistration.create({
          data: {
              userId: user.id,
              companyName,
              companyType,
              companyLogoUrl, 
              status: 'PENDING'
          }
      });
      
      // Update User Profile with company info for easier access
      await prisma.user.update({
          where: { id: user.id },
          data: {
            company_name: companyName,
            company_logo_url: companyLogoUrl
          }
      });

      return NextResponse.json({ success: true, data: registration });

  } catch(error: any) {
      console.error(error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
