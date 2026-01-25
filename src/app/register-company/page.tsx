"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { CheckCircle, ArrowRight, ShieldCheck, Clock, FileText } from "lucide-react";

export default function RegisterCompanyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  Digital Incorporation
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Register your Sdn Bhd Company in Malaysia Online
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Experience a seamless, 100% digital company registration process. 
                  No paperwork, no hidden fees, and fully compliant with SSM verification.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
             {/* Abstract visual/placeholder for Hero Image */}
            <div className="bg-gray-100 rounded-xl p-8 aspect-video flex items-center justify-center border border-gray-200">
               <span className="text-gray-400 font-medium">Hero Image / Dashboard Preview</span>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  Setting up a business shouldn't be complicated. With Anycomp, you can register your company from anywhere in the world. We connect you with certified company secretaries who handle the legalities while you focus on your business.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">SSM Compliant.</strong> All registrations are processed directly with the Suruhanjaya Syarikat Malaysia.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Fast Approval.</strong> Get your Certificate of Incorporation (Form 9) in as little as 3-5 working days.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">All-in-One Package.</strong> Includes name search, secretary appointment, and statutory documents.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  Ready to start? Browse our list of rated specialists and choose the one that fits your budget and needs.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/"
                    className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View Specialists
                  </Link>
                  <Link href="/how-it-works" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to incorporate properly
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                    <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Secure & Confidential
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Your data is protected with enterprise-grade security. Authorization is handled securely via biometric ID verification.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                    <Clock className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Save Time
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Skip the trips to the SSM office. Complete the entire process from your laptop or phone in minutes.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                    <FileText className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Digital Documents
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Access your Superform, Constitution, and Certificate of Incorporation anytime from your dashboard.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
