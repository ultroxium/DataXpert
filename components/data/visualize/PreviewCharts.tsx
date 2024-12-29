'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Maximize2 } from 'lucide-react';
import React, { Suspense, useState } from 'react';
import ChartActions from './chart-action';
import { ChartsList } from '@/config/chart';

interface ChartPreviewProps {
  chartsData: any[];
  columnDetails?: any[];
  workspaceId: string;
  datasetId: string;
}

const componentMap = new Map(ChartsList.map(({ key, component }) => [key, component]));

const PreviewCharts: React.FC<ChartPreviewProps> = ({ chartsData, columnDetails, workspaceId, datasetId }) => {
  const queryClient = useQueryClient();

  const [editLabel, setEditLabel] = useState(0);
  const [chartName, setChartName] = useState('');

  const handleChartNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartName(e.target.value);
  };

  const handleGetLabel = (label: number) => {
    setEditLabel(label);
  };

  const [expandedCard, setExpandedCard] = useState<any>(null);

  const handleExpand = (card: any) => {
    setExpandedCard(card);
  };

  const handleMinimize = () => {
    setExpandedCard(null);
  };

  const updateChartNew = async (workspaceId: string, chartId: string, data: any) => {
    const response = await axios.put(
      `/datasets/api/${workspaceId}/${datasetId}/charts?type=charts&cid=${chartId}`,
      data,
    );
    return response.data;
  };

  const updateChartMutation = useMutation({
    mutationFn: ({
      workspaceId,
      chartId,
      data,
    }: {
      workspaceId: string;
      chartId: string;
      data: any;
    }) => updateChartNew(workspaceId, chartId, data),
    onSuccess: () => {
      if (workspaceId && datasetId) {
        queryClient.invalidateQueries({ queryKey: ['charts', workspaceId, datasetId] });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full p-4 pb-20 relative">
      {chartsData?.length > 0 ? (
        <div className=" w-full">
          <div
            className={`w-full  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-4 transition ease-linear duration-1000 `}>
            {chartsData?.map((item: any, index) => {
              const ChartComponent = componentMap.get(item.key);
              return (
                <Card key={index} className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-white/60 dark:bg-background">
                  <CardHeader className="w-full flex flex-row items-center justify-between py-2 max-h-12">
                    {editLabel === item?.id ? (
                      <Input
                        type="text"
                        value={chartName}
                        onBlur={async () => {
                          if (chartName.trim() === '') {
                            setEditLabel(0);
                            return;
                          }
                          await updateChartMutation.mutateAsync({
                            workspaceId,
                            chartId: item.id,
                            data: { label: chartName },
                          });
                          setEditLabel(0);
                        }}
                        onChange={handleChartNameChange}
                        placeholder={item.label || 'Title'}
                        className="font-semibold focus:outline-none text-16 flex gap-2 items-center"
                        minLength={1}
                        autoFocus
                      />
                    ) : (
                      <CardTitle
                        className={`text-16 flex gap-2 items-center text-muted-foreground`}
                        onDoubleClick={() => {
                          setEditLabel(item?.id);
                          setChartName(item.label);
                        }}>
                        {item.label}
                      </CardTitle>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant={'ghost'}
                        className="py-0 px-2"
                        onClick={() => handleExpand(item)}>
                        <Maximize2 size={16} />
                      </Button>
                      <ChartActions
                        item={item}
                        columnDetails={columnDetails}
                        getEditLabel={handleGetLabel}
                        workspaceId={workspaceId}
                        datasetId={datasetId}
                        updateChartMutation={updateChartMutation}
                      />
                    </div>
                  </CardHeader>
                  <Suspense
                    fallback={
                      <div className="h-80 w-full p-4 flex items-center">
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
                      <CardContent className="h-[100px] flex items-center justify-center">
                        {item?.error}
                      </CardContent>
                    )}
                  </Suspense>
                </Card>
              );
            })}
          </div>
          <Dialog open={expandedCard !== null} onOpenChange={handleMinimize}>
            {expandedCard &&
              (() => {
                const ChartComponent = componentMap.get(expandedCard.key);
                return (
                  <DialogContent className="rounded-lg max-w-[1200px]">
                    <DialogHeader className="flex">
                      {editLabel === expandedCard?.id && (
                        <CardTitle
                          className="text-16 flex gap-2 items-center"
                          onDoubleClick={() => {
                            setEditLabel(expandedCard?.id);
                          }}>
                          {expandedCard.label}
                        </CardTitle>
                      )}
                    </DialogHeader>
                    <Suspense
                      fallback={
                        <div className="h-80 w-full p-4 flex items-center">
                          <Skeleton className="h-full w-full" />
                        </div>
                      }>
                      {ChartComponent ? (
                        <ChartComponent
                          xAxisData={expandedCard.xLabel}
                          yAxisData={expandedCard.yLabel}
                          data={expandedCard.data}
                          xLabel={expandedCard?.xAxis || expandedCard?.column}
                          yLabel={expandedCard?.yAxis}
                          plotoption={expandedCard?.option}
                          color={expandedCard?.color}
                        />
                      ) : (
                        <CardContent className="h-[100px] flex items-center justify-center">
                          {expandedCard?.error}
                        </CardContent>
                      )}
                    </Suspense>
                  </DialogContent>
                );
              })()}
          </Dialog>
        </div>
      ) : (
        <NoChartFound />
      )}
    </div>
  );
};

export default PreviewCharts;

const NoChartFound = () => (
  <div className="container h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <div className="mb-8">
      <div className="w-[80px] h-[80px] bg-[url('/d/chart.png')]  bg-cover opacity-50" />
    </div>
    <h2 className="text-2xl font-bold text-primary">No charts have been created yet</h2>
    <p className="text-lg text-muted-foreground">
      {"To get started, use the 'Create' button in the top-left corner."}
    </p>
  </div>
);

// 'use client';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Skeleton } from '@/components/ui/skeleton';
// import { ChartsList } from '@/config/chart';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { Loader2, Maximize2, Save } from 'lucide-react';
// import React, { Suspense, useState, useCallback, useRef, useEffect } from 'react';
// import ChartActions from './chart-action';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';
// import { toast } from 'sonner';

// const ResponsiveGridLayout = WidthProvider(Responsive);

// interface ChartPreviewProps {
//   chartsData: any[];
//   columnDetails?: any[];
//   workspaceId: string;
//   datasetId: string;
//   isEditMode: boolean;
//   setIsEditMode: (value: boolean) => void;
// }

// const componentMap = new Map(ChartsList.map(({ key, component }) => [key, component]));

// export default function PreviewCharts({
//   chartsData,
//   columnDetails,
//   workspaceId,
//   datasetId,
//   isEditMode,
//   setIsEditMode,
// }: ChartPreviewProps) {
//   const queryClient = useQueryClient();

//   const [editLabel, setEditLabel] = useState(0);
//   const [chartName, setChartName] = useState('');
//   const [expandedCard, setExpandedCard] = useState<any>(null);
//   const [layout, setLayout] = useState<any[]>([]);
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
//   const layoutRef = useRef<any[]>([]);

//   const handleChartNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setChartName(e.target.value);
//   };

//   const handleGetLabel = (label: number) => {
//     setEditLabel(label);
//   };

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
//       setIsEditMode(false);
//       toast.success('Updated successfully');
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || 'An unexpected error occurred');
//     },
//   });

//   useEffect(() => {
//     const newLayout = chartsData?.map((item, index) => ({
//       i: item.id.toString(),
//       x: item.layout?.x ?? (index % 3) * 4,
//       y: item.layout?.y ?? Math.floor(index / 3) * 4,
//       w: item.layout?.w ?? 4,
//       h: item.layout?.h ?? 4,
//     }));
//     setLayout(newLayout);
//     layoutRef.current = newLayout;
//   }, [chartsData]);

//   const onLayoutChange = useCallback(
//     (newLayout: any[]) => {
//       setLayout(newLayout);
//       layoutRef.current = newLayout;
//       if (isEditMode) {
//         setHasUnsavedChanges(true);
//       }
//     },
//     [isEditMode],
//   );

//   const handleSaveLayout = async () => {
//     for (const item of layoutRef.current) {
//       await updateChartMutation.mutateAsync({
//         workspaceId,
//         chartId: item.i,
//         data: { layout: { x: item.x, y: item.y, w: item.w, h: item.h } },
//       });
//     }
//     setHasUnsavedChanges(false);
//   };

//   return (
//     <div className="h-full w-full p-4 pb-20 relative">
//       {chartsData?.length > 0 ? (
//         <div className="h-full w-full">
//           <div className="flex justify-end my-2">
//             {isEditMode && (
//               <Button
//                 variant="outline"
//                 onClick={handleSaveLayout}
//                 disabled={!hasUnsavedChanges}
//                 className="flex items-center gap-2">
//                 {updateChartMutation.isPending ? (
//                   <Loader2 className="animate-spin" />
//                 ) : (
//                   <Save size={16} />
//                 )}
//                 Save Layout
//               </Button>
//             )}
//           </div>
//           <ResponsiveGridLayout
//             key={(!isEditMode) && JSON.stringify(layout)}
//             className="layout"
//             layouts={{ lg: layout }}
//             breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//             cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//             rowHeight={80}
//             onLayoutChange={onLayoutChange}
//             isDraggable={isEditMode}
//             isResizable={isEditMode}
//             compactType={null}
//             containerPadding={[0, 0]}
//             preventCollision={true}>
//             {chartsData?.map((item: any) => {
//               const ChartComponent = componentMap.get(item.key);
//               return (
//                 <div key={item.id.toString()} >
//                   <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none">
//                     <CardHeader className="w-full flex flex-row items-center justify-between py-2 max-h-12">
//                       {editLabel === item?.id ? (
//                         <Input
//                           type="text"
//                           value={chartName}
//                           onBlur={async () => {
//                             if (chartName.trim() === '') {
//                               setEditLabel(0);
//                               return;
//                             }
//                             await updateChartMutation.mutateAsync({
//                               workspaceId,
//                               chartId: item.id,
//                               data: { label: chartName },
//                             });
//                             setEditLabel(0);
//                           }}
//                           onChange={handleChartNameChange}
//                           placeholder={item.label || 'Title'}
//                           className="font-semibold focus:outline-none text-16 flex gap-2 items-center"
//                           minLength={1}
//                           autoFocus
//                         />
//                       ) : (
//                         <CardTitle
//                           className={`text-16 flex gap-2 items-center text-muted-foreground`}
//                           onDoubleClick={() => {
//                             setEditLabel(item?.id);
//                             setChartName(item.label);
//                           }}>
//                           {item.label}
//                         </CardTitle>
//                       )}
//                       <div className="flex gap-2">
//                         <Button
//                           variant={'ghost'}
//                           className="py-0 px-2"
//                           onClick={() => handleExpand(item)}>
//                           <Maximize2 size={16} />
//                         </Button>
//                         <ChartActions
//                           item={item}
//                           columnDetails={columnDetails}
//                           getEditLabel={handleGetLabel}
//                           workspaceId={workspaceId}
//                           datasetId={datasetId}
//                           updateChartMutation={updateChartMutation}
//                         />
//                       </div>
//                     </CardHeader>
//                     <Suspense
//                       fallback={
//                         <div className="h-80 w-full p-4 flex items-center">
//                           <Skeleton className="h-full w-full" />
//                         </div>
//                       }>
//                       {ChartComponent ? (
//                         <ChartComponent
//                           xAxisData={item.xLabel}
//                           yAxisData={item.yLabel}
//                           data={item.data}
//                           xLabel={item?.xAxis || item?.column}
//                           yLabel={item?.yAxis}
//                           plotoption={item?.option}
//                           color={item?.color}
//                         />
//                       ) : (
//                         <CardContent className="h-[100px] flex items-center justify-center">
//                           {item?.error}
//                         </CardContent>
//                       )}
//                     </Suspense>
//                   </Card>
//                 </div>
//               );
//             })}
//           </ResponsiveGridLayout>
//           <Dialog open={expandedCard !== null} onOpenChange={handleMinimize}>
//             {expandedCard &&
//               (() => {
//                 const ChartComponent = componentMap.get(expandedCard.key);
//                 return (
//                   <DialogContent className="rounded-lg max-w-[900px]">
//                     <DialogHeader className="flex">
//                       <CardTitle className="text-16 flex gap-2 items-center">
//                         {expandedCard.label}
//                       </CardTitle>
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
// }

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
