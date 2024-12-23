'use client';

import { Github, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Logo from '../logo';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="sticky top-0 z-[100] w-full bg-background/80 backdrop-blur-sm border-b">
      <nav className="w-full h-16">
        <div className="max-w-[75vw] h-full mx-auto">
          <div className="flex h-full items-center justify-between">
            <Link href="/" className="flex z-40 font-semibold items-center space-x-2">
              <Logo />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href={'https://github.com/ultroxium/DataXpert'} target="_blank">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              {isMounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
              <Link href="/login">
                <Button variant="default">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

