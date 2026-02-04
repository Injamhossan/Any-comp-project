"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { FileSpreadsheet, Building2, Scale, Calculator, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/specialists')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
         <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Our Services</h1>
            <p className="text-lg text-gray-500">
               We offer a comprehensive suite of corporate services to help you manage and grow your business in Malaysia.
            </p>
         </div>

         {loading ? (
             <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>
         ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {services.map((service, index) => (
                   <Link 
                      key={index} 
                      href={`/services/${service.slug}`}
                      className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col z-10 cursor-pointer"
                   >
                      <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-blue-600 mb-6 w-fit pointer-events-none`}>
                         <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors pointer-events-none">
                         {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 flex-grow line-clamp-3 pointer-events-none">
                         {service.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 pointer-events-none">
                          <span className="font-bold text-lg">RM {Number(service.final_price || service.base_price).toLocaleString()}</span>
                          <span className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                             View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                      </div>
                   </Link>
                ))}
             </div>
         )}
         
         <div className="mt-20 bg-gray-900 rounded-3xl p-10 md:p-16 text-center text-white max-w-5xl mx-auto">
             <h2 className="text-3xl font-bold mb-4">Looking for something else?</h2>
             <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                 We also support audit coordination, trademark registration, and visa applications.
             </p>
             <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                 Contact Support
             </button>
         </div>
      </main>
    </div>
  );
}
