"use client"

import React, { Suspense, lazy } from 'react';
import Spinner from '../common/spinner';
import SearchParam from '@/lib/search-param';
import { ColumnDetails } from './column-details';
import { ColumnInsights } from './insights';
import { ChartsData } from './visualize/ChartsData';
import ChatPage from './assistant';

const DatasetVisualization = lazy(() => import('./overview'));
const DataVisualizePage = lazy(() => import('./visualize'));


export default function Main({
  workspaceId,
  datasetId,
}: {
  workspaceId: string;
  datasetId: string;
}) {
  const tab = SearchParam('tab');

  return (
    <Suspense
      fallback={
        <Spinner />
      }>
      {tab === 'overview' && (
        <>
          <ColumnDetails workspaceId={workspaceId} datasetId={datasetId} isProcessed="false" />
          <ColumnInsights workspaceId={workspaceId} datasetId={datasetId} />
          <DatasetVisualization workspaceId={workspaceId} datasetId={datasetId} />
        </>
      )}
      {tab === 'visualize' && (
        <>
          <ColumnDetails workspaceId={workspaceId} datasetId={datasetId} isProcessed="false" />
          <ChartsData workspaceId={workspaceId} datasetId={datasetId} />
          <DataVisualizePage workspaceId={workspaceId} datasetId={datasetId} />
        </>
      )}

      {tab === "assistant" && (
        <>
          <ChatPage workspaceId={workspaceId} datasetId={datasetId} />
        </>
      )}

      {!tab && (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl text-gray-500">Page not found.</h1>
        </div>
      )}
    </Suspense>
  );
}

