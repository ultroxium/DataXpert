import Link from 'next/link'
import { ArrowRight, ChartArea, Cpu, House, MessageSquare, Settings, Sparkles, UserPlus } from 'lucide-react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import Logo from '@/components/logo'
import { useRouter } from 'next/navigation'
import { title } from 'process'
import SearchParam from '@/lib/search-param'

const SideBarItems = [
    {
        id: 1,
        title: 'Overview',
        tab: 'overview',
        icon: House,
    },
    {
        id: 2,
        title: 'Chat with AI',
        tab: 'assistant',
        icon: MessageSquare,
    },
    {
        id: 3,
        title: 'Visualize data',
        tab: 'visualize',
        icon: ChartArea,
    },
    {
        id: 4,
        title: 'PreProcess & Train',
        tab: 'preprocess',
        icon: Cpu,
    },
    {
        id: 5,
        title: 'Make Prediction',
        tab: 'predict',
        icon: Sparkles,
    }
]

export function PreviewPageSideBar() {
    const router = useRouter();
    const tab = SearchParam('tab')

    return (
        <Sidebar>
            <SidebarHeader className="h-16 flex items-start justify-center px-4">
                <Link href="/">
                    <Logo />
                </Link>
            </SidebarHeader>
            <SidebarContent className="">
                <SidebarMenu className="space-y-2 py-8">
                    {SideBarItems.map((item) => (
                        <SidebarMenuItem key={item.id} className="px-4" onClick={() => {
                            router.push(`?tab=${item.tab}`)
                        }}>
                            <span className={`
        flex items-center gap-4 py-2 px-4 rounded-lg
        transition-all duration-200
        hover:bg-gradient-to-r hover:from-rose-600/90 hover:to-rose-500/20 hover:text-white
        ${item?.tab === tab ?
                                    "bg-gradient-to-r from-rose-600 to-rose-500/20 text-white" :
                                    "text-gray-500"
                                }
        cursor-pointer
      `}>
                                <item.icon size={20} />
                                <span className='text-16 font-[500]'>{item.title}</span>
                            </span>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            {/* <SidebarFooter className="border-t p-4">
                
            </SidebarFooter> */}
        </Sidebar>
    )
}

