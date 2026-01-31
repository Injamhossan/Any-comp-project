"use client";

import { ClipboardList, Search } from "lucide-react";
import React from "react";

export default function MyOrdersPage() {
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

      {/* Empty State */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
          <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
             <ClipboardList className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No Orders Yet</h3>
          <p className="text-gray-500 text-sm max-w-sm mt-2">
            You haven't placed any orders yet. Once you purchase a service, it will appear here.
          </p>
      </div>
    </div>
  );
}
