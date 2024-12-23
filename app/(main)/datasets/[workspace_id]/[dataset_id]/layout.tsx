import { SidebarProvider } from '@/components/ui/sidebar';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'DataXpert - Data Exploration, Visualization, and Predictive Analytics',
  description:
    'DataXpert: Connect, preprocess, explore, and visualize data with AI-powered tools for real-time, actionable insights.',
});

export default function OverView({ children }: { children: React.ReactNode }) {
  return <>
    <SidebarProvider>
      {children}
    </SidebarProvider>
  </>;
}
