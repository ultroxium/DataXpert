'use client';

import { BetweenVerticalEnd, Github, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import LoginPopover from './login-dialog';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BetweenVerticalEnd className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Data<span className="text-primary">Xpert</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="https://github.com/ultroxium/DataXpert"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            {isMounted && (
              <button
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </button>
            )}
            <LoginPopover title={"Sign in"}/>
          </nav>
        </div>
      </div>
    </header>
  );
}

