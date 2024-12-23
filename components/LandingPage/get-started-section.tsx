import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function GetStartedBanner() {
  return (
    <section className="mb-4">
      <div className="max-w-[75vw] mx-auto text-center bg-gradient-to-r from-orange-600 to-yellow-300 py-8 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Data?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Start visualizing your data and uncovering insights with DataViz Pro. 
          Sign up now and get your first month free!
        </p>
        <Button size="lg" className="group" variant="outline">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  )
}

