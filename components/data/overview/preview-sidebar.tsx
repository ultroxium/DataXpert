import Link from 'next/link'
import { ArrowRight, Settings, UserPlus } from 'lucide-react'
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

export function PreviewPageSideBar() {
    const router = useRouter();
    return (
        <Sidebar>
            <SidebarHeader className="px-4 h-16 flex items-start justify-center">
                <Link href="/">
                    <Logo />
                </Link>
            </SidebarHeader>
            <SidebarContent className="py-4">
                <SidebarMenu className="space-y-4">
                    <SidebarMenuItem className="px-4">
                        <div className='w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-lg flex items-center gap-4 px-4'>
                            <div className='flex flex-col'>
                                <span className='text-36 font-bold text-secondary dark:text-white'>Want to create own Dashboard?</span>
                                <Button variant='secondary' onClick={() => {
                                    router.push(`?tab=visualize`)
                                }} className='w-fit flex items-center group bg-primary/50 rounded-full px-8 text-white'>Try Now <ArrowRight size={16} className='group-hover:translate-x-2 transition-all duration-300' /> </Button>
                            </div>
                        </div>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            {/* <SidebarFooter className="border-t p-4">
                
            </SidebarFooter> */}
        </Sidebar>
    )
}

