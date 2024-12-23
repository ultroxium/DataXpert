'use client';
import { UploadCloud } from 'lucide-react';
import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

import FetchUploader from './upload-api';
import CSVUploader from './upload-csv';

interface UploadDatasetDialogProps {
  wid: string;
}

export default function UploadDatasetDialog({ wid }: UploadDatasetDialogProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full h-full rounded-lg flex flex-col items-center justify-center border-4 border-orange-600  border-dashed hover:bg-orange-600/60 hover:text-white transition-all duration-300 cursor-pointer group">
          <span className='w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center'>
            <UploadCloud size={16} />
          </span>
          Upload dataset
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start" side="right" sideOffset={4}>
        <Tabs defaultValue="csv" className="w-full p-4">
          <div className="border-b px-3 py-2">
            <h3 className="text-lg font-semibold">Upload Dataset</h3>
          </div>
          <TabsList className="w-full grid grid-cols-2 mt-4">
            <TabsTrigger value="csv">CSV/Excel</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[450px]">
            <TabsContent value="csv">
              <CSVUploader wid={wid} />
            </TabsContent>
            <TabsContent value="api">
              <FetchUploader wid={wid} />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
