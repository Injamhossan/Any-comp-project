"use client";

import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";
import React from "react";

export default function HelpSupportPage() {
  return (
    <div className="space-y-6">
      <div>
         <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
         <p className="text-gray-500 text-sm mt-1">Get assistance with your account or services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500 mt-2 mb-4">Get a response within 24 hours.</p>
              <a href="mailto:support@anycomp.com" className="text-blue-600 font-medium text-sm hover:underline">support@anycomp.com</a>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Live Chat</h3>
              <p className="text-sm text-gray-500 mt-2 mb-4">Chat with our support team.</p>
              <button className="text-green-600 font-medium text-sm hover:underline">Start Chat</button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Phone Support</h3>
              <p className="text-sm text-gray-500 mt-2 mb-4">Available Mon-Fri, 9am-6pm.</p>
              <a href="tel:+60123456789" className="text-purple-600 font-medium text-sm hover:underline">+60 12-345 6789</a>
          </div>
      </div>

      {/* FAQ Section (Placeholder) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
          </div>
          <div className="p-6 space-y-4">
              {[
                  "How do I register a new company?",
                  "What documents are required for incorporation?",
                  "How long does the process take?",
                  "How can I change my company secretary?"
              ].map((q, i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <button className="flex w-full items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-blue-600">
                          <span>{q}</span>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                      </button>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}
