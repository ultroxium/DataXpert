"use client"
import Link from 'next/link'
import { AreaChart, Cpu, Home, MessageSquare, Settings, Sparkles } from 'lucide-react'
import SearchParam from '@/lib/search-param'

const sidebarItems = [
  {
    title: "Overview",
    tab: "overview",
    icon: Home,
  },
  {
    title: "Chat with AI",
    tab: "assistant",
    icon: MessageSquare,
  },
  {
    title: "Visualize data",
    tab: "visualize",
    icon: AreaChart,
  },
  {
    title: "PreProcess & Train",
    tab: "preprocess",
    icon: Cpu,
  },
  {
    title: "Make Prediction",
    tab: "predict",
    icon: Sparkles,
  },
]

const PreviewPageSidebar=()=> {
  const tab = SearchParam("tab")

  return (
    <aside className="w-64 h-full flex flex-col justify-between">
      <nav className="flex-grow py-4">
        <div className="px-4 mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</h2>
        </div>
        <ul className="space-y-2 pr-4">
          {sidebarItems.map((item) => (
            <li key={item.tab}>
              <Link
                href={`?tab=${item.tab}`}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
                  tab === item.tab
                    ? 'bg-muted '
                    : ' hover:bg-muted '
                }`}
              >
                <item.icon size={14} className='mr-2'/>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* version info */}
        <div className="flex-shrink-0 px-4 py-4 text-xs text-gray-500 border-t">
            <span className="text-muted-foreground">Version 1.0.0</span>
        </div>
      
    </aside>
  )
}

export default PreviewPageSidebar;