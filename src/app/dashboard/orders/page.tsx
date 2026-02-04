"use client";


import { ClipboardList, Search, Loader2, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link"; // Added Link import

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
        if (!user?.email) return;

        try {
            // 1. Get User ID first
            const profileRes = await fetch(`/api/user/profile?email=${encodeURIComponent(user.email)}`);
            const profileData = await profileRes.json();
          
            if (profileData.success && profileData.data) {
                // 2. Fetch Orders
                const ordersRes = await fetch(`/api/orders?userId=${profileData.data.id}`);
                const ordersData = await ordersRes.json();
                if (ordersData.success) {
                    setOrders(ordersData.data);
                }
            }
        } catch (e) {
            console.error("Failed to load orders", e);
        } finally {
            setLoading(false);
        }
    }

    fetchOrders();
  }, [user]);

  if (loading) {
      return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-blue-900 h-8 w-8"/></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Service Orders</h1>
           <p className="text-gray-500 text-sm mt-1">Track and manage your service requests.</p>
        </div>
      </div>

      {/* Filters / Search (Placeholder) */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full pl-10 h-10 rounded-md border-gray-200 text-sm focus:border-blue-500 focus:ring-0"
            />
         </div>
      </div>

      {orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
              <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                 <ClipboardList className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No Orders Yet</h3>
              <p className="text-gray-500 text-sm max-w-sm mt-2">
                You haven't placed any orders yet. Once you purchase a service, it will appear here.
              </p>
          </div>
      ) : (
          <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="h-16 w-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden relative border border-gray-200">
                          {order.specialist?.avatar_url ? (
                              <Image src={order.specialist.avatar_url} alt="S" fill className="object-cover" />
                          ) : (
                              <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold">SVC</div>
                          )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                                  order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                  {order.status}
                              </span>
                              <span className="text-xs text-gray-400">• {new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h3 className="text-base font-bold text-gray-900 truncate">{order.specialist?.title || "Service Request"}</h3>
                          <p className="text-sm text-gray-500">{order.specialist?.secretary_company}</p>
                      </div>

                      <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">RM {Number(order.amount).toLocaleString()}</p>
                          {order.specialist?.slug && (
                              <Link href={`/services/${order.specialist.slug}`} className="text-sm font-semibold text-[#0e3a8d] flex items-center justify-end gap-1 mt-1 hover:underline">
                                  View Service <ArrowRight className="h-3 w-3"/>
                              </Link>
                          )}
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
}
