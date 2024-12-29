import Link from 'next/link'
import { Settings, UserPlus } from 'lucide-react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

import UploadDatasetDialog from './uploadDataDialogue'
import Logo from '../logo'
import WorkspaceSwitcher from './workspace-form'

export function WorkspaceSidebar({
    loadingWorkspaces,
    loadingWorkspace,
    workspacesData,
    mutation,
    workspaceData,
    me,
    widNo,
    workspaceName,
}: any) {
    return (
        <Sidebar className='border-none'>
            <SidebarHeader className="px-4 h-16 flex items-start justify-center">
                <Link href="/">
                    <Logo />
                </Link>
            </SidebarHeader>
            <SidebarContent className="bg-primary/5 rounded-tr-3xl" style={{
                scrollbarWidth: "none"
            }}>
                <SidebarMenu className="space-y-4 py-8">
                    <SidebarMenuItem className="px-4">
                        <WorkspaceSwitcher
                            loadingWorkspaces={loadingWorkspaces}
                            loadingWorkspace={loadingWorkspace}
                            workspacesData={workspacesData}
                            mutation={mutation}
                            workspaceData={workspaceData}
                        />
                    </SidebarMenuItem>

                    <SidebarMenuItem className="px-4">
                        <div className='h-32'>
                            <UploadDatasetDialog
                                wid={workspaceName === 'Default Workspace' ? '0' : widNo.toString()}
                            />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="bg-primary/5 rounded-br-3xl border-t p-4">
                <div className='flex items-center gap-4'>
                    <Avatar className="border h-9 w-9 cursor-pointer rounded-lg">
                        <AvatarImage src={me?.picture} alt={me?.name} className='rounded-lg' />
                        <AvatarFallback className='rounded-lg bg-primary'>{me?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span className="font-medium">{me?.name}</span>
                        <span className="text-xs text-muted-foreground">{me?.email}</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

