"use client";

import React, { useEffect, useState } from "react";
import { Loader2, ArrowRight, UserCheck, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SpecialistsPage() {
  const [specialists, setSpecialists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/specialists')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Filter out drafts if necessary, though backend should ideally handle this
          setSpecialists(data.data.filter((s:any) => !s.is_draft));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Find a Specialist</h1>
           <p className="text-gray-500 text-sm mt-1">Connect with certified company secretaries for your business needs.</p>
        </div>
      </div>

      {loading ? (
           <div className="flex items-center justify-center min-h-[400px]">
               <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
           </div>
      ) : specialists.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {specialists.map((specialist) => (
                   <div key={specialist.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                       <div className="p-6">
                           <div className="flex items-start justify-between">
                               <div className="flex items-center gap-3">
                                   <div className="h-12 w-12 rounded-full bg-gray-100 overflow-hidden relative">
                                       {specialist.avatar_url ? (
                                           <Image src={specialist.avatar_url} alt={specialist.secretary_name || "Specialist"} fill className="object-cover" />
                                       ) : (
                                           <UserCheck className="h-6 w-6 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                       )}
                                   </div>
                                   <div>
                                       <h3 className="font-semibold text-gray-900">{specialist.secretary_name || specialist.title}</h3>
                                       <p className="text-xs text-gray-500">{specialist.secretary_company}</p>
                                   </div>
                               </div>
                               {specialist.average_rating > 0 && (
                                   <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-xs font-medium text-yellow-700">
                                       <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                       {Number(specialist.average_rating).toFixed(1)}
                                   </div>
                               )}
                           </div>
                           
                           <div className="mt-4">
                               <p className="text-sm text-gray-600 line-clamp-2">{specialist.description}</p>
                           </div>

                           <div className="mt-4 flex items-center gap-2 flex-wrap">
                               {(specialist.certifications || []).slice(0, 3).map((cert: string, idx: number) => (
                                   <span key={idx} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-1 rounded-full font-medium">
                                       {cert}
                                   </span>
                               ))}
                           </div>
                       </div>
                       <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                           <div className="flex flex-col">
                               <span className="text-xs text-gray-400">Services start from</span>
                               <span className="font-bold text-gray-900">RM {specialist.base_price}</span>
                           </div>
                           <button className="text-[#0e2a6d] text-sm font-medium hover:underline flex items-center gap-1">
                               View Profile <ArrowRight className="h-4 w-4" />
                           </button>
                       </div>
                   </div>
               ))}
           </div>
      ) : (
           <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
               <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="h-8 w-8 text-gray-300" />
               </div>
               <h3 className="text-lg font-semibold text-gray-900">No Specialists Found</h3>
               <p className="text-gray-500 text-sm max-w-sm mt-2">
                 We are currently onboarding new specialists. Please check back later.
               </p>
           </div>
      )}
    </div>
  );
}
