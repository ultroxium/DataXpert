'use client';
import { useRouter } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import NotificationsCard from './notifications';
import SettingsMenu from './setting-menu';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CustomTooltip } from './custom-tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UserPlus } from 'lucide-react';
import { LinkShare } from '../dashboard/ShareLink';

interface TopbarProps {
  layout?: 'workspace' | 'dataset' | 'settings' | 'dashboard' | 'public';
  title?: string;
  workspaceId?: string;
  datasetId?: string;
  workspaceData?: any;
}

const Topbar = ({ layout = 'workspace', title = "", workspaceId, datasetId, workspaceData }: TopbarProps) => {

  return (
    <div className="h-16">
      <div className="h-full flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant={'outline'} size={'icon'} className='rounded-full'>
            <SidebarTrigger />
          </Button>
          {/* <span className='text-24 font-normal text-muted-foreground'>{title}</span> */}
        </div>

        {/* {workspaceData?.name !== 'Default Workspace' && (
          <div>
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
                  <Button variant="outline" >
                    <UserPlus size={16} />
                    Invite
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side='right'>
                <LinkShare data={workspaceData} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )} */}

        {layout === 'workspace' && (
          <div className="flex items-center gap-4">
            <Button variant="outline" >
              <UserPlus size={16} />
              Invite
            </Button>
            <NotificationsCard />
            <SettingsMenu isLabel={false} />
          </div>
        )}

        {layout === 'dataset' && (
          <div className="flex gap-4">
            <Button variant="outline" >
              <UserPlus size={16} />
              Invite
            </Button>
            <NotificationsCard />
            <SettingsMenu isLabel={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
