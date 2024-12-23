import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Hero = () => {
  return (
    <section className="pb-16 pt-24 flex items-center justify-center overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div
            className={cn(
              'group rounded-full border  bg-slate-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-slate-200 dark:border-white/5 dark:bg-slate-900 dark:hover:bg-slate-800',
            )}>
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-slate-600 hover:duration-300 hover:dark:text-slate-400">
              <span>✨ Introducing DataXpert</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
          <div className='flex flex-col'>
          <span className='text-18 font-semibold text-muted-foreground'>Simplify Machine Learning: From <span className='text-orange-600'>Data Exploration</span> to <span className='text-orange-600'>Predictions</span>.</span>
            <span className="text-5xl font-bold tracking-tighter md:text-[200px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white">
              Data<span className='text-primary'>Xpert</span>
            </span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button className="px-8 py-2 rounded-full ">Get started</Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
