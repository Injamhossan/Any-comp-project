"use client";

import React from "react";
import Image from "next/image";
import { Upload, CheckCircle } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="flex flex-col xl:flex-row h-full">
      {/* Middle Content */}
      <div className="flex-1 px-8 py-8 overflow-y-auto">
        <div className="max-w-4xl">
           <h2 className="text-gray-500 font-medium mb-1">Store</h2>
           <h1 className="text-2xl font-bold text-gray-900 mb-6">Register a new company | Private Limited - Sdn Bhd</h1>

           {/* Image Gallery */}
           <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-12 aspect-video">
                   <Upload className="h-8 w-8 text-gray-400 mb-4" />
                   <p className="text-xs text-gray-500 text-center">
                       Upload an image for your service listing in PNG, JPG or JPEG up to 4MB
                   </p>
               </div>
               <div className="grid grid-rows-2 gap-4 h-full">
                   <div className="bg-gray-100 rounded-lg overflow-hidden relative">
                        {/* Placeholder for top right image */}
                        <div className="absolute inset-0 bg-gray-800/10 flex items-center justify-center text-white font-bold text-center p-4">
                            10 Best Company Secretarial in Johor Bahru
                        </div>
                   </div>
                   <div className="bg-gray-100 rounded-lg overflow-hidden relative">
                        {/* Placeholder for bottom right image */}
                         <div className="absolute inset-0 bg-yellow-100/50 flex items-center justify-center text-gray-800 p-4 font-medium">
                            A Company Secretary Represents a Key Role
                         </div>
                   </div>
               </div>
           </div>

           {/* Description */}
           <div className="mb-8">
               <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
               <p className="text-gray-500">Describe your service here</p>
               <textarea 
                  className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  rows={4}
                  placeholder="Enter service description..."
               />
           </div>

           {/* Additional Offerings */}
           <div className="mb-12">
               <h3 className="text-lg font-bold text-gray-900 mb-2">Additional Offerings</h3>
               <p className="text-gray-500 mb-4">Enhance your service by adding additional offerings</p>
               <button className="text-blue-600 text-sm font-semibold hover:underline">+ Add Offering</button>
           </div>
           
           <hr className="mb-12 border-gray-200" />

           {/* Company Secretary Profile */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-4">Company Secretary</h3>
                   <div className="flex items-start gap-4 mb-4">
                       <div className="h-12 w-12 rounded-full bg-blue-100 overflow-hidden">
                           {/* Avatar placeholder */}
                            <div className="h-full w-full bg-gray-300"></div>
                       </div>
                       <div>
                           <div className="flex items-center gap-2">
                               <h4 className="font-bold text-gray-900">Grace Lam</h4>
                               <CheckCircle className="h-3 w-3 text-blue-500" />
                           </div>
                           <p className="text-xs text-gray-500">Corpsec Services Sdn Bhd</p>
                           <div className="flex items-center gap-1 mt-1">
                               <span className="text-xs font-bold">250 Clients</span>
                               <span className="text-xs text-yellow-500">★ 4.8</span>
                           </div>
                       </div>
                   </div>
                   <p className="text-xs text-gray-500 leading-relaxed">
                       A company secretarial service founded by Alida, who believes that every company deserves clarity, confidence, and care in their compliance journey. Inspired by the spirit of entrepreneurship, Alida treats every client's business as if it were her own.
                   </p>
               </div>

               <div className="space-y-6">
                   <div>
                       <h4 className="font-bold text-gray-900 mb-2">Grace Lam is part of a firm</h4>
                       <p className="text-xs text-gray-500">
                           Company Secretary firms are professional service providers that manage corporate compliance, company registration, and statutory obligations on behalf of businesses.
                       </p>
                   </div>

                   <div>
                       <h4 className="font-bold text-gray-900 mb-2">Firm</h4>
                       <div className="flex items-center gap-3">
                           <div className="h-8 w-8 bg-blue-50 rounded flex items-center justify-center p-1">
                               {/* Logo placeholder */}
                               <span className="text-[10px] font-bold text-blue-800">C</span>
                           </div>
                           <div>
                               <p className="text-sm font-bold text-gray-900">Corpsec Services Sdn Bhd</p>
                               <p className="text-xs text-gray-500">2 Years providing Company Secretarial services</p>
                           </div>
                       </div>
                   </div>

                   <div>
                       <h4 className="font-bold text-gray-900 mb-2">Certifications</h4>
                       <div className="flex gap-2">
                            {/* Certification Badges */}
                            <div className="h-6 w-10 bg-gray-100 rounded"></div>
                            <div className="h-6 w-10 bg-gray-100 rounded"></div>
                            <div className="h-6 w-10 bg-gray-100 rounded"></div>
                       </div>
                   </div>
               </div>
           </div>
        </div>
      </div>

      {/* Right Sidebar: Professional Fee */}
      <div className="w-full xl:w-96 border-l border-gray-200 bg-white p-6 flex flex-col shrink-0">
          <div className="flex gap-2 mb-8">
              <button className="flex-1 bg-[#1e2b4d] text-white py-2 px-4 rounded text-sm font-medium hover:bg-opacity-90">Edit</button>
              <button className="flex-1 bg-blue-800 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-900">Publish</button>
          </div>

          <div className="border border-gray-100 rounded-xl shadow-sm p-6">
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Fee</h2>
               <p className="text-sm text-gray-500 mb-8">Set a rate for your service</p>

               <div className="text-center mb-10">
                   <span className="text-3xl font-bold text-gray-900 underline decoration-gray-300 underline-offset-8">RM 1,800</span>
               </div>

               <div className="space-y-3 text-sm">
                   <div className="flex justify-between">
                       <span className="font-medium text-gray-700">Base price</span>
                       <span className="font-bold text-gray-900">RM 1,800</span>
                   </div>
                   <div className="flex justify-between">
                       <span className="font-medium text-gray-700 underline decoration-dotted">Service processing fee</span>
                       <span className="font-bold text-gray-900">RM 540</span>
                   </div>
                   <div className="flex justify-between pt-3 border-t border-gray-100">
                       <span className="font-medium text-gray-700">Total</span>
                       <span className="font-bold text-gray-900">RM 2340</span>
                   </div>
               </div>

               <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                   <span className="font-bold text-gray-700">Your returns</span>
                   <span className="font-bold text-gray-900">RM 1,800</span>
               </div>
          </div>
      </div>
    </div>
  );
}
