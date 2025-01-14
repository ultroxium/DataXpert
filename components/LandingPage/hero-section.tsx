"use client"

import LoginDialog from './login-dialog'
import { useEffect, useState } from 'react'
import * as React from "react"
import Image from 'next/image'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <section className='flex items-end'>
      <div className="relative w-full py-24 flex items-center justify-center px-4 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h1 className="text-slate-700 sm:text-5xl md:text-6xl">
            Unlock the Power of Your Data
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-slate-600 sm:text-lg md:mt-5 md:text-xl">
            Analyze, visualize, train, and predict - all in one platform.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <LoginDialog title='Get started' isArrow={true} />
          </div>
        </div>


      </div>

<div className="w-1/2 p-4 bg-gray-50 rounded-l-xl">
      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {/* Logo */}
        <div className="col-span-1">
        </div>
        
        {/* Top row images */}
        <div className="col-span-1">
          <div className="aspect-square relative">
            <Image
              src="/U/1.png"
              alt="Bedroom scene with white bedding"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        
        {/* Large right image */}
        <div className="col-span-2">
          <div className="aspect-[16/10] relative">
            <Image
              src="/U/2.png"
              alt="Bright bedroom with skylight"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        
        {/* Bottom row */}
        <div className="col-span-1">
          <div className="aspect-square relative">
            <Image
             src="/U/4.png"
              alt="Close up of bedding"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        
        {/* Large bottom image */}
        <div className="col-span-3">
          <div className="aspect-[16/10] relative">
            <Image
              src="/U/3.png"
              alt="Modern bedroom interior"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>

    </section>
  )
}

