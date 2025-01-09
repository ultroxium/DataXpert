'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import Slider from 'react-slick'
import { ChevronLeft, ChevronRight } from 'lucide-react'
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"

const features = [
  {
    title: 'Advanced Analytics',
    description: 'Gain deep insights from your CSV data with our powerful analytics tools.',
    icon: '📊',
  },
  {
    title: 'Machine Learning',
    description: 'Leverage cutting-edge ML algorithms to predict trends and patterns.',
    icon: '🧠',
  },
  {
    title: 'Real-time Visualization',
    description: 'Create stunning, interactive visualizations of your data in real-time.',
    icon: '📈',
  },
  {
    title: 'Data Cleaning',
    description: 'Automatically clean and preprocess your CSV data for analysis.',
    icon: '🧹',
  },
]

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <motion.div
    className="bg-white p-6 rounded-lg border h-[14rem]"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

export function FeaturesSection() {
  // const [sliderRef, setSliderRef] = useState<Slider | null>(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <section className="pb-24">
      {/* <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Slider ref={(slider) => setSliderRef(slider)} {...settings}>
            {features.map((feature, index) => (
              <div key={index} className="px-4">
                <FeatureCard {...feature} />
              </div>
            ))}
          </Slider>
          <motion.button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            onClick={() => sliderRef?.slickPrev()}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            onClick={() => sliderRef?.slickNext()}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div> */}
    </section>
  )
}

