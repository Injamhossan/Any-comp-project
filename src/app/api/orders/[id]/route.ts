
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Order, OrderStatus } from "@/entities/Order";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!id || !status) {
        return NextResponse.json({ success: false, message: "Missing ID or Status" }, { status: 400 });
    }

    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
         return NextResponse.json({ success: false, message: "Invalid Status" }, { status: 400 });
    }

    const db = await getDb();
    const repo = db.getRepository(Order);
    
    await repo.update(id, { status: status as OrderStatus });
    const updatedOrder = await repo.findOne({ where: { id } });

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error: any) {
    console.error("Order Update Failed:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 });
    }

    const db = await getDb();
    const repo = db.getRepository(Order);
    
    const order = await repo.findOne({ where: { id } });
    if (!order) {
        return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    await repo.remove(order);

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (error: any) {
    console.error("Order Deletion Failed:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Error" }, { status: 500 });
  }
}
