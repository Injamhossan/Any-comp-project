import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

async function runSeed() {
  const adminEmail = "admin@anycomp.com";
  let createdAdmin = false;
  let createdSpecialists = false;

  // Ensure an admin user exists with a known password for testing
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    const passwordHash = await bcrypt.hash("admin123", 10);

    admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        password: passwordHash,
        role: 'ADMIN',
      }
    });

    createdAdmin = true;
  }

  // Seed a couple of demo specialists/services if none exist
  const specialistCount = await prisma.specialist.count();
  if (specialistCount === 0) {
    await prisma.specialist.createMany({
      data: [
        {
          title: "Company Incorporation with Certified Secretary",
          slug: "company-incorporation-certified-secretary",
          description:
            "Incorporate your Sdn Bhd company in Malaysia with a certified and experienced company secretary.",
          base_price: 2340,
          platform_fee: 0,
          final_price: 2340,
          verification_status: 'VERIFIED',
          is_verified: true,
          is_draft: false,
          secretary_name: "Nur Amina Zahirah",
          secretary_company: "Zahirah Corporate Services Sdn Bhd",
          duration_days: 5,
        },
        {
          title: "Digital Marketing & Company Registration Bundle",
          slug: "digital-marketing-company-registration-bundle",
          description:
            "Get strategic digital marketing advice together with complete company registration support.",
          base_price: 1170,
          platform_fee: 0,
          final_price: 1170,
          verification_status: 'VERIFIED',
          is_verified: true,
          is_draft: false,
          secretary_name: "Aisha Rahman",
          secretary_company: "CorpServe Consultancy Sdn Bhd",
          duration_days: 7,
        },
      ]
    });

    createdSpecialists = true;
  }

  // Seed Service Offering Master List
  const offeringsData = [
    {
      title: "Company Secretary Subscription",
      description: "Enjoy 1 month free Company Secretary Subscription",
      s3_key: "user-check",
      bucket_name: "anycomp-assets"
    },
    {
      title: "Opening of a Bank Account",
      description: "Complimentary Corporate Bank Account Opening",
      s3_key: "landmark",
      bucket_name: "anycomp-assets"
    },
    {
      title: "Access Company Records and SSM Forms",
      description: "24/7 Secure Access to Statutory Company Records",
      s3_key: "files",
      bucket_name: "anycomp-assets"
    },
    {
      title: "Priority Filling",
      description: "Documents are prioritized for submission and swift processing - within 24 hours",
      s3_key: "zap",
      bucket_name: "anycomp-assets"
    },
    {
      title: "Registered Office Address Use",
      description: "Use of SSM-Compliant Registered Office Address with Optional Mail Forwarding",
      s3_key: "map-pin",
      bucket_name: "anycomp-assets"
    },
    {
      title: "Compliance Calendar Setup",
      description: "Get automated reminders for all statutory deadlines",
      s3_key: "calendar-check",
      bucket_name: "anycomp-assets"
    },
    {
      title: "First Share Certificate Issued Free",
      description: "Receive your company's first official share certificate at no cost",
      s3_key: "award",
      bucket_name: "anycomp-assets"
    },
    {
      title: "CTC Delivery & Courier Handling",
      description: "Have your company documents and certified copies delivered securely to you",
      s3_key: "truck",
      bucket_name: "anycomp-assets"
    },
    {
      title: "Chat Support",
      description: "Always-On Chat Support for Compliance, Filing, and General Queries",
      s3_key: "headphones",
      bucket_name: "anycomp-assets"
    }
  ];

  for (const offering of offeringsData) {
    await prisma.serviceOfferingMasterList.upsert({
      where: { id: offering.title }, // This won't work if id is UUID, searching by title instead
      update: {},
      create: offering,
    }).catch(async () => {
      // If title is not unique in schema, we use findFirst/create
      const exists = await prisma.serviceOfferingMasterList.findFirst({
        where: { title: offering.title }
      });
      if (!exists) {
        await prisma.serviceOfferingMasterList.create({ data: offering });
      }
    });
  }

  return { createdAdmin, createdSpecialists, createdOfferings: true };
}

export async function GET() {
  try {
    const result = await runSeed();
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Dev seed error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Dev seed failed",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}

