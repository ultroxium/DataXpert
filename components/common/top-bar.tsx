'use client';
import { useRouter } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import NotificationsCard from './notifications';
import SettingsMenu from './setting-menu';
import { Button } from '../ui/button';

interface TopbarProps {
  layout?: 'workspace' | 'dataset' | 'settings' | 'dashboard' | 'public';
  title?: string;
  workspaceId?: string;
  datasetId?: string;
}

const Topbar = ({ layout = 'workspace',title="", workspaceId, datasetId }: TopbarProps) => {

  return (
    <div className="z-40 border-b bg-sidebar h-16">
      <div className="h-full flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
        <Button variant={'outline'} size={'icon'} className='rounded-full'>
        <SidebarTrigger />
        </Button>
        <span className='text-20'>{title}</span>
        </div>

        {layout === 'workspace' && (
          <div className="flex items-center gap-4">
            <NotificationsCard />
            <SettingsMenu isLabel={false} />
          </div>
        )}

        {layout === 'dataset' && (
          <div className="flex gap-4">
            <NotificationsCard />
            <SettingsMenu isLabel={false} />
          </div>
        )}

        {layout === 'dashboard' && (
          <div className="flex items-center gap-4">
            <NotificationsCard />
            <SettingsMenu isLabel={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
