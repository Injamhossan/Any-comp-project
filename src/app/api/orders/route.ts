
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { specialistId, userId, amount } = body;

    if (!specialistId || !userId || !amount) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const order = await (prisma as any).order.create({
      data: {
        specialistId,
        userId,
        amount,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const specialistId = searchParams.get('specialistId');

    if (!userId && !specialistId) {
        return NextResponse.json({ success: false, message: "UserId or SpecialistId required" }, { status: 400 });
    }

    const whereClause: any = {};
    if (userId) whereClause.userId = userId;
    // For now we focus on purchases, but this supports sales too
    if (specialistId) whereClause.specialistId = specialistId;

    const orders = await (prisma as any).order.findMany({
        where: whereClause,
        include: {
            specialist: {
                select: {
                    title: true,
                    secretary_name: true,
                    secretary_company: true,
                    avatar_url: true,
                    slug: true
                }
            },
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });

  } catch(error: any) {
      console.error("Order Fetch Error:", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
