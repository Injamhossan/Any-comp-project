"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState, useRef } from "react";
import { Loader2, Camera, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      photoUrl: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user?.email) {
        setFormData(prev => ({ 
            ...prev, 
            email: user.email!, 
            name: user.displayName || "",
            photoUrl: user.photoURL || "" 
        }));
        
        fetch(`/api/user/profile?email=${encodeURIComponent(user.email)}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setFormData(prev => ({
                        ...prev,
                        name: data.data.name || user.displayName || "",
                        phone: data.data.phone || "",
                        photoUrl: data.data.photo_url || user.photoURL || ""
                    }));
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      try {
          const res = await fetch("/api/upload", {
              method: "POST",
              body: data
          });
          const result = await res.json();
          if (result.success) {
              setFormData(prev => ({ ...prev, photoUrl: result.url }));
          } else {
              alert("Upload failed: " + (result.error || "Unknown error"));
          }
      } catch (err) {
          console.error(err);
          alert("Error uploading image");
      } finally {
          setUploading(false);
      }
  };

  const handleSave = async () => {
      setSaving(true);
      try {
          const res = await fetch('/api/user/profile', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  email: formData.email,
                  name: formData.name,
                  phone: formData.phone,
                  photoUrl: formData.photoUrl
              })
          });
          const data = await res.json();
          if (data.success) {
              alert("Profile updated successfully!");
              router.refresh();
          } else {
              alert("Failed to update profile: " + data.message);
          }
      } catch (error) {
          console.error(error);
          alert("An error occurred.");
      } finally {
          setSaving(false);
      }
  };

  return (
    <div className="space-y-6">
      <div>
         <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
         <p className="text-gray-500 text-sm mt-1">Manage your profile and preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          </div>
          <div className="p-6 space-y-6">
              {loading ? (
                  <div className="flex justify-center py-4"><Loader2 className="animate-spin text-gray-400"/></div>
              ) : (
                  <div className="max-w-4xl">
                    {/* Profile Image Section */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative group">
                            <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200 relative">
                                {formData.photoUrl ? (
                                    <Image src={formData.photoUrl} alt="Preview" fill className="object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-gray-400 bg-gray-50">
                                        <UserIcon className="h-10 w-10" />
                                    </div>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <Camera className="h-4 w-4" />
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleImageUpload} 
                                className="hidden" 
                                accept="image/*"
                            />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900">Profile Photo</h4>
                            <p className="text-xs text-gray-500 mt-1">Update your profile picture. Recommended: 400x400px.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Display Name</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-200 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                disabled
                                className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 text-gray-500 shadow-sm sm:text-sm px-3 py-2 border cursor-not-allowed"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="+60"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                            />
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-50 mt-8">
                        <button 
                            onClick={handleSave}
                            disabled={saving || uploading}
                            className="bg-[#0e2a6d] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#002f70] disabled:opacity-50 flex items-center gap-2 transition-all active:scale-[0.98]"
                        >
                            {(saving || uploading) && <Loader2 className="h-4 w-4 animate-spin"/>}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                  </div>
              )}
          </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
          </div>
          <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                  <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-xs text-gray-500">Receive updates about your account and orders.</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-green-400 checked:bg-green-400"/>
                      <div className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
