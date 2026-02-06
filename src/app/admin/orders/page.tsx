"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Search, ShoppingBag, Eye, DollarSign, Calendar, User, ChevronDown, Trash2, X, FileText, Mail, Phone, Clock } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  status: string;
  amount: number;
  createdAt: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  requirements?: string;
  user?: {
    name: string;
    email: string;
  };
  specialist: {
    title: string;
    secretary_company?: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;
    
    setIsDeleting(orderId);
    try {
        const res = await fetch(`/api/orders/${orderId}`, {
            method: 'DELETE',
        });
        
        if (res.ok) {
            setOrders(prev => prev.filter(o => o.id !== orderId));
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
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            toast.success("Order status updated successfully");
        } else {
            toast.error("Failed to update status");
        }
    } catch (error) {
        console.error("Failed to update status", error);
        toast.error("Error updating status");
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'PAID': return "bg-green-100 text-green-800 border-green-200";
        case 'PENDING': return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case 'CANCELLED': return "bg-red-100 text-red-800 border-red-200";
        case 'COMPLETED': return "bg-blue-100 text-blue-800 border-blue-200";
        default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.customerName && o.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (o.user?.name && o.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 bg-white min-h-screen font-sans text-gray-900 px-6 py-8 relative">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
           <p className="mt-1 text-sm text-gray-500">Manage customer orders and payments.</p>
        </div>
        <div className="mt-4 sm:mt-0 relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:border-indigo-500 focus:ring-indigo-500 text-black placeholder:text-gray-400"
             />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
             <div className="flex justify-center p-12"><Loader2 className="animate-spin text-gray-400 h-8 w-8"/></div>
        ) : filteredOrders.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center">
                            <User className="h-4 w-4 text-indigo-600"/>
                        </div>
                        <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                                {order.customerName || order.user?.name || "Guest"}
                            </div>
                            <div className="text-xs text-gray-500">
                                {order.customerEmail || order.user?.email || "No email"}
                            </div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                     <span className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-gray-400" />
                        {order.specialist.title}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    RM {Number(order.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative inline-block w-full min-w-[120px]">
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            className={`
                                w-full appearance-none border border-transparent text-[11px] font-bold uppercase tracking-wider py-1.5 pl-3 pr-8 rounded-full cursor-pointer focus:ring-0 focus:outline-none transition-colors
                                ${getStatusColor(order.status)}
                            `}
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="PAID">PAID</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-current pointer-events-none opacity-60" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-full transition-colors"
                        title="View Details"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button 
                        onClick={() => handleDelete(order.id)}
                        disabled={isDeleting === order.id}
                        className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full transition-colors disabled:opacity-50"
                        title="Delete Order"
                    >
                        {isDeleting === order.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-gray-500 text-sm">
             No orders found.
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <div>
                          <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">#{selectedOrder.id.toUpperCase()}</p>
                      </div>
                      <button 
                          onClick={() => setSelectedOrder(null)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                      >
                          <X className="h-5 w-5 text-gray-500" />
                      </button>
                  </div>

                  <div className="p-8 overflow-y-auto space-y-8">
                      {/* Summary Section */}
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-1">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</span>
                              <div className={`px-3 py-1 rounded-full text-xs font-bold inline-block border ${getStatusColor(selectedOrder.status)}`}>
                                  {selectedOrder.status}
                              </div>
                          </div>
                          <div className="space-y-1">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Amount</span>
                              <div className="text-xl font-bold text-gray-900">RM {Number(selectedOrder.amount).toLocaleString()}</div>
                          </div>
                      </div>

                      <div className="h-[1px] bg-gray-100 w-full"></div>

                      {/* Customer & Service Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                  <User className="h-4 w-4 text-indigo-500" /> Customer Information
                              </h4>
                              <div className="space-y-2">
                                  <div className="flex items-center gap-3 text-sm">
                                      <User className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-700">{selectedOrder.customerName || selectedOrder.user?.name || "Guest"}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                      <Mail className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-700">{selectedOrder.customerEmail || selectedOrder.user?.email || "No email"}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                      <Phone className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-700">{selectedOrder.customerPhone || "No phone provided"}</span>
                                  </div>
                              </div>
                          </div>
                          <div className="space-y-4">
                              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                  <ShoppingBag className="h-4 w-4 text-indigo-500" /> Service Details
                              </h4>
                              <div className="space-y-2">
                                  <div className="flex items-center gap-3 text-sm font-semibold text-indigo-700">
                                      <FileText className="h-4 w-4" />
                                      <span>{selectedOrder.specialist.title}</span>
                                  </div>
                                  {selectedOrder.specialist.secretary_company && (
                                      <div className="flex items-center gap-3 text-xs text-gray-500 ml-7">
                                          <span>{selectedOrder.specialist.secretary_company}</span>
                                      </div>
                                  )}
                                  <div className="flex items-center gap-3 text-sm text-gray-700">
                                      <Clock className="h-4 w-4 text-gray-400" />
                                      <span>Ordered on {new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-900">Custom Requirements</h4>
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-700 min-h-[80px] leading-relaxed">
                              {selectedOrder.requirements || "No additional requirements specified by the customer."}
                          </div>
                      </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                      <button 
                          onClick={() => setSelectedOrder(null)}
                          className="px-6 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
                      >
                          Close
                      </button>
                      <button 
                          onClick={() => {
                              setSelectedOrder(null);
                              window.print();
                          }}
                          className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                          <FileText className="h-4 w-4" /> Print Invoice
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
