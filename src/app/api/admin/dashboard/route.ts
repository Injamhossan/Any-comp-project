
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Message } from "@/entities/Message";
import { Invoice, InvoiceStatus } from "@/entities/Invoice";
import { Document } from "@/entities/Document";
import { Order } from "@/entities/Order";
import { User, UserRole } from "@/entities/User";

export async function GET() {
  try {
    const db = await getDb();
    
    const [messages, invoices, documents, ordersCount, clientsCount, recentOrders] = await Promise.all([
      db.getRepository(Message).find({ 
          take: 5, 
          order: { createdAt: 'DESC' } 
      }),
      db.getRepository(Invoice).find({ 
          take: 5, 
          order: { createdAt: 'DESC' },
          relations: ["user"]
      }),
      db.getRepository(Document).find({
          take: 5,
          order: { createdAt: 'DESC' },
          relations: ["user"]
      }),
      db.getRepository(Order).count(),
      db.getRepository(User).count({ where: { role: UserRole.USER } }),
      db.getRepository(Order).find({
        take: 5,
        order: { createdAt: 'DESC' },
        relations: ["user", "specialist"]
      })
    ]);
    
    // Calculate total revenue
    const revenueResult = await db.getRepository(Invoice)
        .createQueryBuilder("invoice")
        .select("SUM(invoice.amount)", "sum")
        .where("invoice.status = :status", { status: InvoiceStatus.PAID })
        .getRawOne();
        
    const totalRevenue = parseFloat(revenueResult?.sum || "0");

    const stats = {
        totalClients: clientsCount,
        totalRevenue: totalRevenue,
        activeOrders: ordersCount,
        conversionRate: "3.2%"
    };

    return NextResponse.json({ 
        success: true, 
        data: {
            stats,
            recentActivity: messages,
            recentOrders: recentOrders
        } 
    });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
