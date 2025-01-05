import { ArrowRight, BarChart2, Eye, PieChart, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import LoginDialog from './login-dialog'

export default function Hero() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Unlock the Power of Your Data
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
          Analyze, visualize, train, and predict - all in one platform.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <LoginDialog title='Get started' isArrow={true}/>
        </div>
      </div>
    </div>
  )
}

