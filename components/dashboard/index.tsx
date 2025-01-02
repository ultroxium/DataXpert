'use client';

import { FileSpreadsheet, FileX, Search, Bot, LineChart } from 'lucide-react';
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
    <main className="flex h-screen bg-background">
      {/* <WorkspaceSidebar
        loadingWorkspaces={loadingWorkspaces}
        loadingWorkspace={loadingWorkspace}
        workspacesData={workspacesData}
        mutation={mutation}
        workspaceData={workspaceData}
        me={me}
        widNo={widNo}
        workspaceName={workspaceName}
      /> */}
      <div className='flex-1 overflow-auto space-y-4 flex flex-col'>
        <Topbar title='Dashboard' workspaceData={workspaceData} />
        <div className="space-y-8 w-[60rem] mx-auto pt-8">
          <div className='h-44 w-full rounded-lg'>
            <CSVUploader wid={widNo.toString()}/>

          </div>
          <div className="flex justify-between items-center">
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
              <DatasetTable datasets={sortedDatasets} widNo={widNo} FilteredWorkspaces={FilteredWorkspaces} deleteDatasetMutation={deleteDatasetMutation} moveDatasetMutation={moveDatasetMutation} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const DatasetTable = ({ datasets, widNo, FilteredWorkspaces, deleteDatasetMutation, moveDatasetMutation }) => (
  <div className="w-full overflow-auto">
  <Table className="border border-border rounded-lg overflow-hidden">
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-[40%] font-semibold">Dataset</TableHead>
        <TableHead className="w-[20%] font-semibold">Last Modified</TableHead>
        <TableHead className="w-[20%] font-semibold">Created</TableHead>
        <TableHead className="text-right font-semibold">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {datasets.map((file: any, index: number) => (
        <TableRow 
          key={file.id}
          className={index % 2 === 0 ? 'bg-muted/30' : 'bg-muted/50'}
        >
          <TableCell className="font-medium border-t border-border">
            <Link 
              href={`/datasets/${file.workspace_id}/${file.id}?tab=overview`}
              className="flex items-center text-primary hover:underline"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              <span>{file.name}</span>
            </Link>
          </TableCell>
          <TableCell className="text-muted-foreground border-t border-border">
            {file.updated_at && moment(file.updated_at).isValid() 
              ? moment(file.updated_at).fromNow() 
              : 'N/A'}
          </TableCell>
          <TableCell className="text-muted-foreground border-t border-border">
            {moment(file.created_at).fromNow()}
          </TableCell>
          <TableCell className="text-right border-t border-border">
            <DatasetActions
              dataset={file}
              widNo={widNo}
              FilteredWorkspaces={FilteredWorkspaces}
              deleteDatasetMutation={deleteDatasetMutation}
              moveDatasetMutation={moveDatasetMutation}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
    <h3 className="mt-2 text-lg font-medium">No datasets</h3>
    <p className="mt-1 text-sm text-muted-foreground">Get started by creating a new dataset.</p>
    <Button className="mt-4">Create Dataset</Button>
  </div>
);

export default DashboardComponent;
