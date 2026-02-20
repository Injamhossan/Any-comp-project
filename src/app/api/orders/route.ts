import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      specialistId,
      userId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      requirements,
    } = body;

    // Validate: Access require either a User ID OR Guest Details
    const hasUser = !!userId;
    const hasGuestDetails =
      !!customerName && !!customerEmail && !!customerPhone;

    if (!specialistId || !amount || (!hasUser && !hasGuestDetails)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields. Provide either valid User ID or Name/Email/Phone for guest.",
        },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
        data: {
          specialistId,
          userId: userId || null,
          amount,
          status: 'PENDING',
          customerName,
          customerEmail,
          customerPhone,
          requirements,
        }
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const specialistId = searchParams.get("specialistId");
    if (!userId && !specialistId) {
      return NextResponse.json(
        { success: false, message: "UserId or SpecialistId required" },
        { status: 400 }
      );
    }

    const whereClause: any = {};
    if (userId) whereClause.userId = userId;
    if (specialistId) whereClause.specialistId = specialistId;

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        specialist: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error: any) {
    console.error("Order Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
