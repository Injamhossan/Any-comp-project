"use client";

import { ClipboardList, Search, Loader2, ArrowRight, Store, ShoppingBag, Trash2, X, User, Mail, Phone, Clock, FileText, CheckCircle, ChevronDown, Check, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [isSpecialist, setIsSpecialist] = useState(false);
  const [activeTab, setActiveTab] = useState<'purchases' | 'sales'>('purchases');
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    if (!user?.email) return;

    try {
        setLoading(true);

        // 1. Get User Profile for Purchases
        const profileRes = await fetch(`/api/user/profile?email=${encodeURIComponent(user.email)}`);
        const profileData = await profileRes.json();
        
        if (profileData.success && profileData.data) {
            // Fetch Purchases
            const pRes = await fetch(`/api/orders?userId=${profileData.data.id}`);
            const pData = await pRes.json();
            if (pData.success) setPurchases(pData.data);
        }

        // 2. Get Specialist Profile for Sales
        const specRes = await fetch(`/api/specialists?email=${encodeURIComponent(user.email)}`);
        const specData = await specRes.json();

        if (specData.success && specData.data.length > 0) {
            const specialist = specData.data[0];
            setIsSpecialist(true);
            
            // Fetch Sales
            const sRes = await fetch(`/api/orders?specialistId=${specialist.id}`);
            const sData = await sRes.json();
            if (sData.success) setSales(sData.data);
        }

    } catch (e) {
        console.error("Failed to load orders", e);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order record? This cannot be undone.")) return;
    
    setIsDeleting(orderId);
    try {
        const res = await fetch(`/api/orders/${orderId}`, {
            method: 'DELETE',
        });
        
        if (res.ok) {
            if (activeTab === 'purchases') {
                setPurchases(prev => prev.filter(o => o.id !== orderId));
            } else {
                setSales(prev => prev.filter(o => o.id !== orderId));
            }
            toast.success("Order deleted successfully");
        } else {
            const data = await res.json();
            toast.error(data.message || "Failed to delete order");
        }
    } catch (error) {
        console.error("Failed to delete order:", error);
        toast.error("Error deleting order");
    } finally {
        setIsDeleting(null);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
        const res = await fetch(`/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        
        if (res.ok) {
            // Optimistic update locally
            setSales(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            toast.success("Order status updated successfully");
        } else {
            toast.error("Failed to update status");
        }
    } catch (error) {
        console.error("Failed to update status", error);
        toast.error("Error updating status");
    }
  };

  if (loading) {
      return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-blue-900 h-8 w-8"/></div>;
  }

  const ordersToDisplay = (activeTab === 'purchases' ? purchases : sales).filter(o => {
      const matchSearch = (o.id + (o.customerName || "") + (o.specialist?.title || "")).toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">Orders Management</h1>
           <p className="text-gray-500 text-sm mt-1">Track your purchases and client orders.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {isSpecialist && (
            <div className="flex p-1 bg-gray-100/80 rounded-xl w-fit border border-gray-200/50 backdrop-blur-sm shadow-sm">
                <button
                    onClick={() => setActiveTab('purchases')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'purchases' ? 'bg-white text-[#0e3a8d] shadow-md ring-1 ring-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <ShoppingBag className="h-4 w-4" />
                    My Purchases
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] ml-1">{purchases.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab('sales')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'sales' ? 'bg-white text-[#0e3a8d] shadow-md ring-1 ring-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <Store className="h-4 w-4" />
                    Client Orders
                    <span className="bg-[#0e3a8d]/10 text-[#0e3a8d] px-2 py-0.5 rounded-full text-[10px] ml-1">{sales.length}</span>
                </button>
            </div>
        )}

        <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 h-11 rounded-xl border-gray-100 shadow-sm text-sm focus:border-[#0e3a8d] focus:ring-1 focus:ring-[#0e3a8d]/20 text-black placeholder:text-gray-400"
            />
        </div>
      </div>

      {ordersToDisplay.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
              <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                 <ClipboardList className="h-10 w-10 text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No Orders Found</h3>
              <p className="text-gray-500 text-sm max-w-sm mt-3 leading-relaxed">
                {activeTab === 'purchases' 
                    ? "You haven't placed any orders yet. Explore our services to get started." 
                    : "You haven't received any client orders yet. Make sure your services are live!"}
              </p>
          </div>
      ) : (
          <div className="grid grid-cols-1 gap-5">
              {ordersToDisplay.map((order) => (
                  <div key={order.id} className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-xl hover:border-blue-50 transition-all duration-300">
                      <div className="h-16 w-16 rounded-2xl bg-gray-50 flex-shrink-0 overflow-hidden relative border border-gray-100 shadow-inner group-hover:scale-110 transition-transform">
                           {activeTab === 'purchases' ? (
                                order.specialist?.avatar_url ? (
                                    <Image src={order.specialist.avatar_url} alt="S" fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300 text-xs font-bold uppercase tracking-widest bg-gradient-to-br from-gray-50 to-gray-100">PRO</div>
                                )
                           ) : (
                               <div className="flex items-center justify-center h-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">USER</div>
                           )}
                      </div>
                      
                      <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-3 text-xs font-bold text-gray-400/80 mb-2">
                              <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-lg border border-gray-100">#{order.id.slice(0, 8).toUpperCase()}</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          
                          {activeTab === 'purchases' ? (
                               <>
                                 <h3 className="text-lg font-black text-gray-900 truncate tracking-tight">{order.specialist?.title || "Service Request"}</h3>
                                 <p className="text-xs font-bold text-gray-500/80 tracking-wide uppercase">{order.specialist?.secretary_company || "Professional Service"}</p>
                               </>
                          ) : (
                             <>
                                <h3 className="text-lg font-black text-gray-900 truncate tracking-tight">
                                    {order.customerName || order.user?.name || "Guest User"}
                                </h3>
                                <p className="text-xs font-bold text-gray-500/80 tracking-wide uppercase">{order.customerEmail || order.user?.email || "Direct Order"}</p>
                             </>
                          )}

                          <div className="pt-2">
                            {activeTab === 'sales' ? (
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="relative inline-block text-left">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                            className={`
                                            appearance-none border border-transparent text-[11px] font-black uppercase tracking-widest py-1.5 pl-4 pr-10 rounded-full cursor-pointer focus:ring-0 focus:outline-none shadow-sm transition-all
                                            ${order.status === 'PENDING' ? 'bg-yellow-100/80 text-yellow-700 border-yellow-200' : 
                                                order.status === 'COMPLETED' ? 'bg-green-100/80 text-green-700 border-green-200' : 
                                                order.status === 'CANCELLED' ? 'bg-red-100/80 text-red-700 border-red-200' : 
                                                'bg-[#0e3a8d]/10 text-[#0e3a8d] border-[#0e3a8d]/20'}
                                            `}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="PAID">PAID</option>
                                            <option value="COMPLETED">COMPLETED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-current pointer-events-none opacity-40" />
                                    </div>
                                    <button 
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-2 text-gray-400 hover:text-[#0e3a8d] hover:bg-blue-50 rounded-xl transition-all"
                                        title="View Details"
                                    >
                                        <Eye className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteOrder(order.id)}
                                        disabled={isDeleting === order.id}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
                                        title="Delete Order"
                                    >
                                        {isDeleting === order.id ? <Loader2 className="h-5 w-5 animate-spin"/> : <Trash2 className="h-5 w-5" />}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit inline-block border ${
                                        order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                                        order.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-100' : 
                                        order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-100' :
                                        'bg-blue-50 text-blue-700 border-blue-100'
                                    }`}>
                                        {order.status}
                                    </span>
                                    <button 
                                        onClick={() => setSelectedOrder(order)}
                                        className="text-xs font-bold text-gray-400 hover:text-[#0e3a8d] flex items-center gap-1 transition-colors"
                                    >
                                        <Eye className="h-3.5 w-3.5" /> Details
                                    </button>
                                </div>
                            )}
                          </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-3 self-center">
                          <p className="text-2xl font-black text-gray-900 tracking-tight">RM {Number(order.amount).toLocaleString()}</p>
                           {activeTab === 'purchases' && order.specialist?.slug && (
                              <Link href={`/services/${order.specialist.slug}`} className="group/link text-xs font-black uppercase tracking-widest text-[#0e3a8d] flex items-center gap-2 hover:bg-[#0e3a8d] hover:text-white px-5 py-2.5 rounded-2xl transition-all shadow-sm ring-1 ring-[#0e3a8d]/20">
                                  View Page <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform"/>
                              </Link>
                          )}
                      </div>
                  </div>
              ))}
          </div>
      )}

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-[2px]">
              <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col animate-in fade-in slide-in-from-right duration-300">
                  <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div>
                          <h2 className="text-2xl font-black text-gray-900 font-sans tracking-tight">Order Details</h2>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Ref: {selectedOrder.id.toUpperCase()}</p>
                      </div>
                      <button onClick={() => setSelectedOrder(null)} className="p-3 hover:bg-white rounded-2xl shadow-sm transition-all border border-gray-100">
                          <X className="h-6 w-6 text-gray-500" />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10 space-y-12">
                      {/* Price & Status Header */}
                      <div className="flex justify-between items-end">
                           <div className="space-y-1">
                               <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">Current Status</p>
                               <span className={`px-5 py-2 rounded-2xl text-xs font-black border tracking-widest uppercase inline-block
                                   ${selectedOrder.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                                     selectedOrder.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-100' : 
                                     'bg-[#0e3a8d]/10 text-[#0e3a8d] border-[#0e3a8d]/20'}
                               `}>
                                   {selectedOrder.status}
                               </span>
                           </div>
                           <div className="text-right">
                               <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase mb-1">Total Payment</p>
                               <h3 className="text-4xl font-black text-[#0e3a8d] tracking-tighter">RM {Number(selectedOrder.amount).toLocaleString()}</h3>
                           </div>
                      </div>

                      {/* Information Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-5">
                              <h4 className="text-sm font-black text-gray-900 border-l-4 border-[#0e3a8d] pl-3 uppercase tracking-widest italic">Client Info</h4>
                              <div className="space-y-4">
                                  <div className="flex items-start gap-4">
                                      <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><User className="h-5 w-5" /></div>
                                      <div>
                                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Name</p>
                                          <p className="text-sm font-bold text-gray-700">{selectedOrder.customerName || selectedOrder.user?.name || "Guest User"}</p>
                                      </div>
                                  </div>
                                  <div className="flex items-start gap-4">
                                      <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><Mail className="h-5 w-5" /></div>
                                      <div>
                                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email</p>
                                          <p className="text-sm font-bold text-gray-700">{selectedOrder.customerEmail || selectedOrder.user?.email || "No email provided"}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-5">
                              <h4 className="text-sm font-black text-gray-900 border-l-4 border-emerald-500 pl-3 uppercase tracking-widest italic">Service Info</h4>
                              <div className="space-y-4">
                                  <div className="flex items-start gap-4">
                                      <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><ShoppingBag className="h-5 w-5" /></div>
                                      <div>
                                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Selected Package</p>
                                          <p className="text-sm font-bold text-gray-700">{selectedOrder.specialist.title}</p>
                                      </div>
                                  </div>
                                  <div className="flex items-start gap-4">
                                      <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><Clock className="h-5 w-5" /></div>
                                      <div>
                                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Order Date</p>
                                          <p className="text-sm font-bold text-gray-700">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Requirements Section */}
                      <div className="space-y-4">
                          <h4 className="text-sm font-black text-gray-900 border-l-4 border-yellow-400 pl-3 uppercase tracking-widest italic">Customer Requirements</h4>
                          <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl border border-gray-100 min-h-[120px] shadow-inner text-sm text-gray-700 leading-relaxed font-medium">
                              {selectedOrder.requirements ? (
                                  <div className="flex gap-4">
                                      <div className="text-yellow-500 mt-1"><CheckCircle className="h-5 w-5" /></div>
                                      <p>{selectedOrder.requirements}</p>
                                  </div>
                              ) : (
                                  <p className="text-gray-400 italic">No special requirements provided for this order.</p>
                              )}
                          </div>
                      </div>
                  </div>

                  <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex gap-4">
                      {activeTab === 'sales' && (
                          <button 
                            onClick={async () => {
                                await handleStatusUpdate(selectedOrder.id, 'COMPLETED');
                                setSelectedOrder((prev: any) => ({...prev, status: 'COMPLETED'}));
                            }}
                            className="flex-1 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-[1.5rem] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                          >
                              <Check className="h-4 w-4" /> Mark Completed
                          </button>
                      )}
                      <button 
                        onClick={() => setSelectedOrder(null)}
                        className="px-10 bg-white border border-gray-200 text-gray-700 font-black uppercase tracking-widest text-xs py-4 rounded-[1.5rem] hover:bg-gray-100 transition-all"
                      >
                          Close
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
