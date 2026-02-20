import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!id || !status) {
        return NextResponse.json({ success: false, message: "Missing ID or Status" }, { status: 400 });
    }

    const updatedOrder = await prisma.$transaction(async (tx) => {
        const orderBefore = await tx.order.findUnique({
            where: { id },
            select: { status: true, specialistId: true }
        });

        if (!orderBefore) throw new Error("Order not found");

        const updated = await tx.order.update({
            where: { id },
            data: { status }
        });

        // Increment purchase_count ONLY if status is changing TO 'PAID' from something else
        if (status === 'PAID' && orderBefore.status !== 'PAID') {
            await tx.specialist.update({
                where: { id: orderBefore.specialistId },
                data: {
                    purchase_count: {
                        increment: 1
                    }
                }
            });
        }

        return updated;
    });

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

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
        return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    await prisma.order.delete({
        where: { id }
    });

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (error: any) {
    console.error("Order Deletion Failed:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Error" }, { status: 500 });
  }
}
