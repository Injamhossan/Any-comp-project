
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Order, OrderStatus } from "@/entities/Order";
import { Specialist } from "@/entities/Specialist";

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

    const db = await getDb();
    const order = await db.manager.transaction(async (transactionalEntityManager) => {
      const newOrder = transactionalEntityManager.create(Order, {
          specialistId,
          userId: userId || null,
          amount,
          status: OrderStatus.PENDING,
          customerName,
          customerEmail,
          customerPhone,
          requirements,
      });
      
      const savedOrder = await transactionalEntityManager.save(newOrder);

      await transactionalEntityManager.increment(Specialist, { id: specialistId }, "purchase_count", 1);

      return savedOrder;
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

    const db = await getDb();
    const whereClause: any = {};
    if (userId) whereClause.userId = userId;
    if (specialistId) whereClause.specialistId = specialistId;

    const orders = await db.getRepository(Order).find({
      where: whereClause,
      relations: ["specialist", "user"],
      order: { createdAt: "DESC" },
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
