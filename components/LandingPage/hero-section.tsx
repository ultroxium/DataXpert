'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AnimatedShinyText from '../ui/animated-shiny-text'
import { BarChart3, Bot, FileUp, Users, Workflow } from 'lucide-react'
import Image from 'next/image'
import LoginDialog from './login-dialog'

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-24 overflow-hidden ">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden border-none rounded-2xl shadow-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-0"></div>
          <CardContent className="relative z-10 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12 p-8 lg:p-12">
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className='text-4xl lg:text-5xl font-bold mb-4 text-foreground'>
                {"Simplify "}
                <AnimatedShinyText className="inline-block">
                  {"Machine Learning"}
                </AnimatedShinyText>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Unlock the power of Data with our intuitive platform
              </p>
              <LoginDialog title={"Get Started"}/>
            </motion.div>
            <motion.div 
              className="lg:w-1/2 relative h-64 lg:h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/vid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`${feature.color} rounded-xl p-6 shadow-none transition-all duration-300 ease-in-out transform hover:-translate-y-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-normal">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const features = [
  {
    title: <span>Smart <span className='text-primary'>AI Assistant</span></span>,
    icon: <Bot className="w-6 h-6 text-primary" />,
    desc: 'Leverage Gemini AI for in-depth data exploration and insights.',
    color: 'bg-primary/5',
  },
  {
    title: <span>Dynamic Visual Analytics</span>,
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    desc: 'Transform your data into actionable charts and graphs instantly.',
    color: 'bg-green-600/10',
  },
  {
    title: <span>From <span className='text-primary'>Prep</span> to <span className='text-primary'>Prediction</span></span>,
    icon: <Workflow className="w-6 h-6 text-primary" />,
    desc: 'Shape your data, craft your model, and unleash powerful predictions—all on your terms.',
    color: 'bg-orange-600/5',
  }
]
