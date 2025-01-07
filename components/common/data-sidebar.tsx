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

const Sidebar=()=> {
  const tab = SearchParam("tab")

  return (
    <aside className="w-[20rem] h-full flex flex-col justify-between bg-gray-50 dark:bg-gray-800/30 border-r">
      <nav className="flex-grow p-4">
        <div className="px-4 mb-4">
          <h2 className="font-semibold text-gray-500 uppercase tracking-wider">Menu</h2>
        </div>
        <ul className="space-y-4">
          {sidebarItems.map((item) => (
            <li key={item.tab}>
              <Link
                href={`?tab=${item.tab}`}
                className={`flex items-center px-4 py-2 font-medium rounded-md transition-colors duration-150 ease-in-out ${
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
    </aside>
  )
}

export default Sidebar;