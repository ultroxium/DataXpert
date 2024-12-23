import Link from 'next/link'
import { Settings, UserPlus } from 'lucide-react'
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

import UploadDatasetDialog from './uploadDataDialogue'
import Logo from '../logo'
import WorkspaceSwitcher from './workspace-form'
import { CustomTooltip } from '../common/custom-tooltip'
import { LinkShare } from './ShareLink'

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
        <Sidebar>
            <SidebarHeader className="px-4 h-16 flex items-start justify-center">
                <Link href="/">
                    <Logo />
                </Link>
            </SidebarHeader>
            <SidebarContent className="py-4">
                <SidebarMenu className="space-y-4">
                    <SidebarMenuItem className="px-4">
                        <WorkspaceSwitcher
                            loadingWorkspaces={loadingWorkspaces}
                            loadingWorkspace={loadingWorkspace}
                            workspacesData={workspacesData}
                            mutation={mutation}
                            workspaceData={workspaceData}
                        />
                    </SidebarMenuItem>

                    {workspaceData?.name !== 'Default Workspace' && (
                        <SidebarMenuItem className="px-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {workspaceData?.teams[0]?.members.length > 1 ? (
                                        <div className="flex -space-x-2 overflow-hidden cursor-pointer">
                                            {workspaceData?.teams[0]?.members.map((member: any, index: number) => (
                                                <CustomTooltip title={member?.user_obj?.name} key={index}>
                                                    <Avatar className="w-8 h-8 border-2 border-white rounded-full">
                                                        <AvatarImage src={member?.user_obj?.picture} alt={member?.user_obj?.name} />
                                                        <AvatarFallback>{member?.user_obj?.name.charAt(0).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                </CustomTooltip>
                                            ))}
                                        </div>
                                    ) : (
                                        <Button variant="outline" size="sm">
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Invite
                                        </Button>
                                    )}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" side='right'>
                                    <LinkShare data={workspaceData} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    )}

                    <SidebarMenuItem className="px-4">
                        <div className='h-32'>
                            <UploadDatasetDialog
                                wid={workspaceName === 'Default Workspace' ? '0' : widNo.toString()}
                            />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
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

