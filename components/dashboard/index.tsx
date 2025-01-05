'use client';

import { FileSpreadsheet, FileX, Search, Bot, LineChart, BoxIcon } from 'lucide-react';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SortBy from './Sortby';
import DatasetActions from './dataset-actions';
import { useProfile } from '@/hooks/use-profile';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WorkspaceSidebar } from './side-bar';
import Topbar from '../common/top-bar';
import Link from 'next/link';
import CSVUploader from './upload-csv';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { DatasetGrid } from './dataset-grid';

const DashboardComponent = ({
  workspacesData,
  workspaceData,
  datasetsData,
  mutation,
  deleteDatasetMutation,
  moveDatasetMutation,
  loadingWorkspace,
  loadingWorkspaces,
  loadingDatasets,
}: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [widNo, setWidNo] = useState(0);
  const [workspaceName, setWorkspaceName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOptions, setSortOptions] = useState('asc');

  useEffect(() => {
    const workspaceParam = searchParams.get('wsn');
    const widParam = searchParams.get('wid');
    const widNumber = parseInt(widParam ?? '', 10);

    if (workspaceParam && workspaceParam !== workspaceName) {
      setWorkspaceName(workspaceParam);
    }

    if (widParam && widNumber !== widNo) {
      setWidNo(widNumber);
    } else if (!widParam && widNo !== 0) {
      setWidNo(0);
    }
  }, [searchParams, workspaceName, widNo]);

  const FilteredWorkspaces = workspacesData?.filter(
    (workspace: any) => workspace?.name !== workspaceName,
  );

  const filteredDatasets = datasetsData?.filter((dataset: any) =>
    dataset?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSort = (sort: string) => {
    setSortOptions(sort);
  };

  const sortedDatasets = filteredDatasets
    ?.map((dataset) => dataset)
    .sort((a, b) => {
      if (sortOptions === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOptions === 'desc') {
        return b.name.localeCompare(a.name);
      } else if (sortOptions === 'created_at') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortOptions === 'updated_at') {
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      }
    });

  const { data: me, isLoading: meLoading, error: profileError } = useProfile();

  return (
    <main className="h-screen bg-background w-full">
      <Topbar title='Dashboard' workspaceData={workspaceData} />
      <div className='w-full flex'>
        <WorkspaceSidebar
          loadingWorkspaces={loadingWorkspaces}
          loadingWorkspace={loadingWorkspace}
          workspacesData={workspacesData}
          mutation={mutation}
          workspaceData={workspaceData}
          me={me}
          widNo={widNo}
          workspaceName={workspaceName}
        />

        <section className='container px-16 py-8 flex gap-16'>

          <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
            <div className='flex flex-col space-y-8'>
              <div>
                <CSVUploader wid={widNo.toString()} />
              </div>
              <div className="w-full flex justify-between items-center border-t pt-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    className="pl-10 w-64"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <SortBy handleSort={handleSort} />
              </div>
              <div>
                {loadingDatasets ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, index) => (
                      <Skeleton key={index} className="h-12 w-full" />
                    ))}
                  </div>
                ) : sortedDatasets?.length > 0 ? (
                  <DatasetGrid datasets={sortedDatasets} widNo={widNo} FilteredWorkspaces={FilteredWorkspaces} deleteDatasetMutation={deleteDatasetMutation} moveDatasetMutation={moveDatasetMutation} />
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          </ScrollArea>

          <Card className='h-[60vh] w-[18rem] shadow-none bg-gray-50 dark:bg-gray-800/30'>
            <CardHeader className='border-b p-4'>
              Recent Models
            </CardHeader>
            <CardContent className='flex items-center justify-center flex-col h-full space-y-4'>
              <BoxIcon size={44} className='text-muted-foreground' />
              <span>No data found</span>
            </CardContent>
          </Card>
        </section>

      </div>
    </main>
  );
};

// const DatasetTable = ({ datasets, widNo, FilteredWorkspaces, deleteDatasetMutation, moveDatasetMutation }) => (
//   <div className="w-full overflow-auto">

//       <div>
//         {datasets.map((file: any, index: number) => (
//           <Card
//             key={file.id}
//             className={index % 2 === 0 ? 'bg-muted/30' : 'bg-muted/50'}
//           >
//             <TableCell className="font-medium border-t border-border">
//               <Link
//                 href={`/datasets/${file.workspace_id}/${file.id}?tab=overview`}
//                 className="flex items-center text-primary hover:underline"
//               >
//                 <FileSpreadsheet className="mr-2 h-4 w-4" />
//                 <span>{file.name}</span>
//               </Link>
//             </TableCell>
//             <TableCell className="text-muted-foreground border-t border-border">
//               {file.updated_at && moment(file.updated_at).isValid()
//                 ? moment(file.updated_at).fromNow()
//                 : 'N/A'}
//             </TableCell>
//             <TableCell className="text-muted-foreground border-t border-border">
//               {moment(file.created_at).fromNow()}
//             </TableCell>
//             <TableCell className="text-right border-t border-border">
//               <DatasetActions
//                 dataset={file}
//                 widNo={widNo}
//                 FilteredWorkspaces={FilteredWorkspaces}
//                 deleteDatasetMutation={deleteDatasetMutation}
//                 moveDatasetMutation={moveDatasetMutation}
//               />
//             </TableCell>
//           </Card>

//         ))}
//         </div>
//   </div>
// );

const EmptyState = () => (
  <div className="text-center py-12">
    <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
    <h3 className="mt-2 text-lg font-medium">No datasets</h3>
    <p className="mt-1 text-sm text-muted-foreground">Get started by uploading a new dataset.</p>
  </div>
);

export default DashboardComponent;
