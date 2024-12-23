'use client';
import { Bot, LayoutDashboard, LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import NotificationsCard from './notifications';
import SettingsMenu from './setting-menu';

interface TopbarProps {
  layout?: 'workspace' | 'dataset' | 'settings' | 'dashboard' | 'public';
  workspaceId?: string;
  datasetId?: string;
}

const Topbar = ({ layout = 'workspace', workspaceId, datasetId }: TopbarProps) => {
  const router = useRouter();

  return (
    <div className="z-40 border-b bg-sidebar h-16">
      <div className="h-full flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-16">
        <SidebarTrigger />
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
