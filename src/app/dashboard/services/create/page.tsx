"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Upload, Plus, Trash2, Info, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CreateServicePage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      title: "Register a new company | Private Limited - Sdn Bhd",
      description: "",
      basePrice: 1800,
      offerings: [] as {title: string, price: number}[]
  });
  const [images, setImages] = useState<string[]>([]);

  // Derived calculations
  const processingFee = formData.basePrice * 0.3; // 30% fee example
  const total = formData.basePrice + processingFee;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Mock upload for now or implement real logic if API exists
      if (e.target.files && e.target.files[0]) {
          const url = URL.createObjectURL(e.target.files[0]);
          setImages([...images, url]);
      }
  };

  const handleSubmit = async () => {
      setLoading(true);
      try {
          const payload = {
            ...formData,
            final_price: total,
            platform_fee: processingFee,
            secretary_name: user?.displayName || "Unknown Specialist",
            secretary_email: user?.email
            // Add other fields as per Specialist schema
          };

          const res = await fetch('/api/specialists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await res.json();
          if (data.success) {
            router.push('/dashboard/specialists'); // Redirect to list
          } else {
            alert("Failed to create service: " + data.message);
          }
      } catch (err) {
        console.error(err);
        alert("Error creating service");
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      
      {/* Header Actions */}
      <div className="flex items-center justify-end gap-3 mb-6">
          <button className="px-4 py-2 text-sm font-medium text-[#0e2a6d] bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              Edit
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0e2a6d] rounded-md hover:bg-[#002f70] transition-colors flex items-center gap-2"
          >
              {loading && <Loader2 className="h-4 w-4 animate-spin"/>}
              Publish
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left Col) */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Title Section */}
              <div>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full text-2xl font-bold text-gray-900 border-none p-0 focus:ring-0 placeholder:text-gray-300"
                    placeholder="Enter service title..."
                  />
                  <div className="h-0.5 w-full bg-gray-100 mt-2" />
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4 h-80">
                  {/* Main Large Image */}
                  <div className="col-span-1 relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group overflow-hidden">
                      {images[0] ? (
                          <Image src={images[0]} alt="Main" fill className="object-cover" />
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-gray-300 mb-2 group-hover:text-gray-400" />
                          <span className="text-xs text-center text-gray-400 px-4">Upload an image for your service listing in PNG, JPG or JPEG up to 4MB</span>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                        </>
                      )}
                  </div>
                  
                  {/* Secondary Images Column */}
                  <div className="col-span-1 grid grid-rows-2 gap-4">
                      <div className="relative bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                           {/* Placeholder for secondary image */}
                           <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-xs">
                               Secondary Image
                           </div>
                      </div>
                      <div className="relative bg-[#0e2a6d] rounded-lg overflow-hidden flex items-center justify-center text-white p-4 text-center">
                           <div>
                               <h4 className="font-bold text-lg mb-1">10 Best Company Secretarial in Johor Bahru</h4>
                               <p className="text-xs opacity-80">A Company Secretary Represents a Key Role...</p>
                           </div>
                      </div>
                  </div>
              </div>

              {/* Description */}
              <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your service here..."
                    className="w-full h-32 rounded-lg border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
              </div>

              {/* Additional Offerings */}
              <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Additional Offerings</h3>
                  <p className="text-sm text-gray-500 mb-4">Enhance your service by adding additional offerings</p>
                  
                  <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700">
                      <Plus className="h-4 w-4" /> Add Offering
                  </button>
              </div>

              {/* Company Secretary Profile (Bottom) */}
              <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Company Secretary</h3>
                  <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden relative">
                          {user?.photoURL && <Image src={user.photoURL} alt="User" fill className="object-cover" />}
                      </div>
                      <div>
                          <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">{user?.displayName || "Specialist Name"}</span>
                              <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">Verified</span>
                          </div>
                          <p className="text-sm text-gray-500">Corpse Services Sdn Bhd</p>
                          <button className="mt-2 bg-[#0e2a6d] text-white text-xs px-3 py-1.5 rounded hover:bg-[#002f70]">
                              View Profile
                          </button>
                      </div>
                      <div className="ml-auto">
                          <span className="text-sm font-medium text-gray-500 block mb-1">Certified Company Secretary</span>
                          <div className="flex gap-2">
                              {/* Certification Logos Placeholder */}
                              <div className="h-6 w-10 bg-gray-100 rounded"></div>
                              <div className="h-6 w-10 bg-gray-100 rounded"></div>
                          </div>
                      </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                      A company secretarial service founded by Grace, who believes that every company deserves clarity, confidence, and care in their compliance journey. Inspired by the spirit of entrepreneurship...
                  </p>
              </div>

          </div>

          {/* Sidebar (Right Col) */}
          <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-900">Professional Fee</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-6">Set a rate for your service</p>

                  <div className="relative mb-8">
                       <span className="absolute left-0 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">RM</span>
                       <input 
                          type="number"
                          value={formData.basePrice}
                          onChange={(e) => setFormData({...formData, basePrice: parseInt(e.target.value) || 0})}
                          className="w-full text-right text-4xl font-bold text-gray-900 border-none border-b-2 border-gray-200 focus:ring-0 focus:border-black p-0 pl-10"
                       />
                  </div>

                  <div className="space-y-3 py-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Base price</span>
                          <span className="font-medium">RM {formData.basePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-600 underline decoration-dotted cursor-help" title="Platform processing fee">Service processing fee</span>
                          <span className="font-medium">RM {processingFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                          <span>Total</span>
                          <span>RM {total.toLocaleString()}</span>
                      </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm font-medium">
                          <span className="text-gray-900">Your returns</span>
                          <span className="text-gray-900">RM {formData.basePrice.toLocaleString()}</span>
                      </div>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
}
