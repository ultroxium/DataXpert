'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotificationsStore } from '@/store/notification';
import { Bell } from 'lucide-react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWebSocket } from '@/providers/socket-provider';

const NotificationsCard: React.FC = () => {
  const notifications = useNotificationsStore((state) => state.notifications);
  const addNotification = useNotificationsStore((state) => state.addNotification);
  const { getApiNotifications } = useNotificationsStore();
  const { socket } = useWebSocket();

  useEffect(() => {
    getApiNotifications();

    const handleMessage = (data: any) => {
      const receivedData = JSON.parse(data);
      const notification = {
        title: receivedData?.title,
        message: receivedData?.message,
        tag: receivedData?.tag,
        created_at: receivedData?.created_at,
      };
      // console.log('New notification:', notification);
      addNotification(notification);
    };

    if (socket) {
      socket.onmessage = (event) => {
        handleMessage(event.data);
      };
    }
    return () => {
      // if (socket) {
      //   socket.close();
      // }
    };
  }, [addNotification, getApiNotifications, socket]);

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'ghost'}
            className="relative w-9 p-0 m-0 border rounded-full cursor-pointer">
            <Bell size={16} />
            {notifications.length !== 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/30 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary/80 text-[8px] items-center justify-center text-white">
                  {notifications.length}
                </span>
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2">
          <CardHeader className="pb-3 ">
            <div className="flex items-center justify-between w-full">
              <CardTitle>Notifications</CardTitle>
              <Button variant={'link'}>See all</Button>
            </div>
            <CardDescription>View the most recent notifications here.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1 max-w-[400px]">
            {notifications.length > 0 &&
              notifications?.slice(0, 5).map((notification, index) => (
                <div
                  key={index}
                  className="-mx-2 w-full flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                  <div
                    className={`w-10 h-10 flex rounded-full bg-yellow-500 bg-opacity-25 items-center justify-center`}>
                    {notification?.title?.charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-1 flex-1 flex items-start flex-col">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {moment(notification.created_at).fromNow()}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationsCard;
