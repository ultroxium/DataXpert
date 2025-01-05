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
        <aside className='h-[calc(100vh-4rem)] w-[18rem] bg-gray-50 flex flex-col justify-between py-8 px-4 border-r dark:bg-gray-800/20'>
            <WorkspaceSwitcher
                loadingWorkspaces={loadingWorkspaces}
                loadingWorkspace={loadingWorkspace}
                workspacesData={workspacesData}
                mutation={mutation}
                workspaceData={workspaceData}
            />

            <div className='border-t py-4'>
                <span>Version 1.0.0</span>
            </div>
        </aside>
    )
}

