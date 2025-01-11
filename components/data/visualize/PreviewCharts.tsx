// 'use client';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { Maximize2 } from 'lucide-react';
// import React, { Suspense, useState } from 'react';
// import ChartActions from './chart-action';
// import { ChartsList } from '@/config/chart';

// interface ChartPreviewProps {
//   chartsData: any[];
//   columnDetails?: any[];
//   workspaceId: string;
//   datasetId: string;
// }

// const componentMap = new Map(ChartsList.map(({ key, component }) => [key, component]));

// const PreviewCharts: React.FC<ChartPreviewProps> = ({ chartsData, columnDetails, workspaceId, datasetId }) => {
//   const queryClient = useQueryClient();

//   const [editLabel, setEditLabel] = useState(0);
//   const [chartName, setChartName] = useState('');

//   const handleChartNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setChartName(e.target.value);
//   };

//   const handleGetLabel = (label: number) => {
//     setEditLabel(label);
//   };

//   const [expandedCard, setExpandedCard] = useState<any>(null);

//   const handleExpand = (card: any) => {
//     setExpandedCard(card);
//   };

//   const handleMinimize = () => {
//     setExpandedCard(null);
//   };

//   const updateChartNew = async (workspaceId: string, chartId: string, data: any) => {
//     const response = await axios.put(
//       `/datasets/api/${workspaceId}/${datasetId}/charts?type=charts&cid=${chartId}`,
//       data,
//     );
//     return response.data;
//   };

//   const updateChartMutation = useMutation({
//     mutationFn: ({
//       workspaceId,
//       chartId,
//       data,
//     }: {
//       workspaceId: string;
//       chartId: string;
//       data: any;
//     }) => updateChartNew(workspaceId, chartId, data),
//     onSuccess: () => {
//       if (workspaceId && datasetId) {
//         queryClient.invalidateQueries({ queryKey: ['charts', workspaceId, datasetId] });
//       }
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   return (
//     <div className="w-full relative">
//       {chartsData?.length > 0 ? (
//         <div className=" w-full">
//           <div
//             className={`w-full  grid md:grid-cols-2 grid-cols-1 gap-4 py-4 transition ease-linear duration-1000 `}>
//             {chartsData?.map((item: any, index) => {
//               const ChartComponent = componentMap.get(item.key);
//               return (
//                 <Card key={index} className={`w-full h-full flex flex-col items-center justify-center bg-background`}>
//                   <CardHeader className="w-full flex flex-row items-center justify-between py-2 max-h-12">
//                     {editLabel === item?.id ? (
//                       <Input
//                         type="text"
//                         value={chartName}
//                         onBlur={async () => {
//                           if (chartName.trim() === '') {
//                             setEditLabel(0);
//                             return;
//                           }
//                           await updateChartMutation.mutateAsync({
//                             workspaceId,
//                             chartId: item.id,
//                             data: { label: chartName },
//                           });
//                           setEditLabel(0);
//                         }}
//                         onChange={handleChartNameChange}
//                         placeholder={item.label || 'Title'}
//                         className="font-semibold focus:outline-none text-16 flex gap-2 items-center"
//                         minLength={1}
//                         autoFocus
//                       />
//                     ) : (
//                       <CardTitle
//                         className={`text-16 flex gap-2 items-center text-muted-foreground`}
//                         onDoubleClick={() => {
//                           setEditLabel(item?.id);
//                           setChartName(item.label);
//                         }}>
//                         {item.label}
//                       </CardTitle>
//                     )}
//                     <div className="flex gap-2">
//                       <Button
//                         variant={'ghost'}
//                         className="py-0 px-2"
//                         onClick={() => handleExpand(item)}>
//                         <Maximize2 size={16} />
//                       </Button>
//                       <ChartActions
//                         item={item}
//                         columnDetails={columnDetails}
//                         getEditLabel={handleGetLabel}
//                         workspaceId={workspaceId}
//                         datasetId={datasetId}
//                         updateChartMutation={updateChartMutation}
//                       />
//                     </div>
//                   </CardHeader>
//                   <Suspense
//                     fallback={
//                       <div className="h-80 w-full p-4 flex items-center">
//                         <Skeleton className="h-full w-full" />
//                       </div>
//                     }>
//                     {ChartComponent ? (
//                       <ChartComponent
//                         xAxisData={item.xLabel}
//                         yAxisData={item.yLabel}
//                         data={item.data}
//                         xLabel={item?.xAxis || item?.column}
//                         yLabel={item?.yAxis}
//                         plotoption={item?.option}
//                         color={item?.color}
//                       />
//                     ) : (
//                       <CardContent className="h-[100px] flex items-center justify-center">
//                         {item?.error}
//                       </CardContent>
//                     )}
//                   </Suspense>
//                 </Card>
//               );
//             })}
//           </div>
//           <Dialog open={expandedCard !== null} onOpenChange={handleMinimize}>
//             {expandedCard &&
//               (() => {
//                 const ChartComponent = componentMap.get(expandedCard.key);
//                 return (
//                   <DialogContent className="rounded-lg max-w-[1200px]">
//                     <DialogHeader className="flex">
//                       {editLabel === expandedCard?.id && (
//                         <CardTitle
//                           className="text-16 flex gap-2 items-center"
//                           onDoubleClick={() => {
//                             setEditLabel(expandedCard?.id);
//                           }}>
//                           {expandedCard.label}
//                         </CardTitle>
//                       )}
//                     </DialogHeader>
//                     <Suspense
//                       fallback={
//                         <div className="h-80 w-full p-4 flex items-center">
//                           <Skeleton className="h-full w-full" />
//                         </div>
//                       }>
//                       {ChartComponent ? (
//                         <ChartComponent
//                           xAxisData={expandedCard.xLabel}
//                           yAxisData={expandedCard.yLabel}
//                           data={expandedCard.data}
//                           xLabel={expandedCard?.xAxis || expandedCard?.column}
//                           yLabel={expandedCard?.yAxis}
//                           plotoption={expandedCard?.option}
//                           color={expandedCard?.color}
//                         />
//                       ) : (
//                         <CardContent className="h-[100px] flex items-center justify-center">
//                           {expandedCard?.error}
//                         </CardContent>
//                       )}
//                     </Suspense>
//                   </DialogContent>
//                 );
//               })()}
//           </Dialog>
//         </div>
//       ) : (
//         <NoChartFound />
//       )}
//     </div>
//   );
// };

// export default PreviewCharts;

// const NoChartFound = () => (
//   <div className="container h-[60vh] flex flex-col items-center justify-center text-center px-4">
//     <div className="mb-8">
//       <div className="w-[80px] h-[80px] bg-[url('/d/chart.png')]  bg-cover opacity-50" />
//     </div>
//     <h2 className="text-2xl font-bold text-primary">No charts have been created yet</h2>
//     <p className="text-lg text-muted-foreground">
//       {"To get started, use the 'Create' button in the top-left corner."}
//     </p>
//   </div>
// );


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartsList } from "@/config/chart"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Maximize2, Plus } from 'lucide-react'
import React, { Suspense, useState } from "react"
import ChartActions from "./chart-action"

const componentMap = new Map(ChartsList.map(({ key, component }) => [key, component]))

interface ChartPreviewProps {
  chartsData: any[]
  columnDetails?: any[]
  workspaceId: string
  datasetId: string
}

export default function ChartDashboard({ chartsData, columnDetails, workspaceId, datasetId }: ChartPreviewProps) {
  const queryClient = useQueryClient()
  const [editLabel, setEditLabel] = useState(0)
  const [chartName, setChartName] = useState("")
  const [expandedCard, setExpandedCard] = useState<any>(null)
  const [selectedChart, setSelectedChart] = useState<any>(chartsData[0])

  const handleChartNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartName(e.target.value)
  }

  const handleGetLabel = (label: number) => {
    setEditLabel(label)
  }

  const handleExpand = (card: any) => {
    setExpandedCard(card)
  }

  const handleMinimize = () => {
    setExpandedCard(null)
  }

  const handleSelectChart = (chart: any) => {
    setSelectedChart(chart)
  }


  const updateChartNew = async (workspaceId: string, chartId: string, data: any) => {
    const response = await axios.put(`/datasets/api/${workspaceId}/${datasetId}/charts?type=charts&cid=${chartId}`, data)
    return response.data
  }

  const updateChartMutation = useMutation({
    mutationFn: ({ workspaceId, chartId, data }: { workspaceId: string; chartId: string; data: any }) =>
      updateChartNew(workspaceId, chartId, data),
    onSuccess: () => {
      if (workspaceId && datasetId) {
        queryClient.invalidateQueries({ queryKey: ["charts", workspaceId, datasetId] })
      }
    },
  })

  const renderChart = (item: any, isFullSize: boolean = false) => {
    const ChartComponent = componentMap.get(item.key)
    return (
      <Suspense
        fallback={
          <div className={`${isFullSize ? "h-[400px]" : "h-[16rem]"} w-full flex items-center`}>
            <Skeleton className="h-full w-full" />
          </div>
        }>
        {ChartComponent ? (
          <ChartComponent
            xAxisData={item.xLabel}
            yAxisData={item.yLabel}
            data={item.data}
            xLabel={item?.xAxis || item?.column}
            yLabel={item?.yAxis}
            plotoption={item?.option}
            color={item?.color}
          />
        ) : (
          <CardContent className="h-[100px] flex items-center justify-center">{item?.error}</CardContent>
        )}
      </Suspense>
    )
  }

  if (chartsData?.length === 0 ) {
    return <NoChartFound />
  }

  return (
    <div className="w-full space-y-4" >
      {/* Featured Chart */}
      <Card className="w-full shadow-none h-[calc(100vh-20rem)]">
        <CardHeader className="flex flex-row items-center justify-between py-2 border-b">
          {editLabel === selectedChart?.id ? (
            <Input
              type="text"
              value={chartName}
              onBlur={async () => {
                if (chartName.trim() === "") {
                  setEditLabel(0)
                  return
                }
                await updateChartMutation.mutateAsync({
                  workspaceId,
                  chartId: selectedChart.id,
                  data: { label: chartName },
                })
                setEditLabel(0)
              }}
              onChange={handleChartNameChange}
              placeholder={selectedChart.label || "Title"}
              className="font-semibold focus:outline-none text-xl"
              minLength={1}
              autoFocus
            />
          ) : (
            <CardTitle
              className="text-xl"
              onDoubleClick={() => {
                setEditLabel(selectedChart?.id)
                setChartName(selectedChart.label)
              }}>
              {selectedChart?.label}
            </CardTitle>
          )}
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleExpand(selectedChart)}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <ChartActions
              item={selectedChart}
              columnDetails={columnDetails}
              getEditLabel={handleGetLabel}
              workspaceId={workspaceId}
              datasetId={datasetId}
              updateChartMutation={updateChartMutation}
            />
          </div>
        </CardHeader>
        {selectedChart && renderChart(selectedChart, true)}
      </Card>

      {/* Chart Grid */}
      <ScrollArea className="w-full">
        <div className="flex space-x-4 py-4 items-center justify-center">
          {chartsData?.map((item: any) => (
            <Card
              key={item.id}
              className={`flex-shrink-0 w-[100px] h-[100px] shadow-none cursor-pointer transition-all ${
                selectedChart?.id === item.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSelectChart(item)}>
              <CardHeader className="p-2">
                <CardTitle className="text-sm truncate">{item.label}</CardTitle>
              </CardHeader>
              {/* {renderChart(item)} */}
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Expanded Chart Dialog */}
      <Dialog open={expandedCard !== null} onOpenChange={handleMinimize}>
        {expandedCard && (
          <DialogContent className="max-w-[1200px]">
            <DialogHeader>
              <CardTitle>{expandedCard.label}</CardTitle>
            </DialogHeader>
            {renderChart(expandedCard, true)}
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

function NoChartFound() {
  return (
    <div className="container h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <div className="w-[80px] h-[80px] bg-[url('/d/chart.png')] bg-cover opacity-50" />
      </div>
      <h2 className="text-2xl font-bold text-primary">No charts have been created yet</h2>
      <p className="text-lg text-muted-foreground mb-4">Click the button below to create your first chart</p>
    </div>
  )
}

