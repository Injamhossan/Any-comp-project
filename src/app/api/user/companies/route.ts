
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { User, UserRole } from "@/entities/User";
import { CompanyRegistration, RegistrationStatus } from "@/entities/CompanyRegistration";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const name = searchParams.get('name');  

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const db = await getDb();
    const userRepo = db.getRepository(User);

    let user = await userRepo.findOne({
      where: { email },
      relations: ["registrations"]
    });

    if (!user) {
       user = userRepo.create({ 
            email,
            name: name || email.split('@')[0],
            role: UserRole.USER
       });
       await userRepo.save(user);
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

      const db = await getDb();
      const userRepo = db.getRepository(User);
      const regRepo = db.getRepository(CompanyRegistration);
      
      let user = await userRepo.findOne({ 
          where: { email },
          relations: ["registrations"]
      });
      
      if (!user) {
          user = userRepo.create({ email, role: UserRole.USER });
          await userRepo.save(user);
      }

      if (user.registrations && user.registrations.length > 0) {
          return NextResponse.json({ 
              success: false, 
              message: "Limit Reached: You have already registered a company. Only one company registration is allowed per user." 
          }, { status: 400 });
      }

      const registration = regRepo.create({
          userId: user.id,
          companyName,
          companyType,
          companyLogoUrl, 
          status: RegistrationStatus.PENDING
      });
      
      await regRepo.save(registration);

      // Update User Profile with company info for easier access
      await userRepo.update(user.id, {
          company_name: companyName,
          company_logo_url: companyLogoUrl
      });

      return NextResponse.json({ success: true, data: registration });

  } catch(error: any) {
      console.error(error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
