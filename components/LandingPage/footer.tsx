import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'
import Logo from '../logo'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              <img src="/logo.png" alt="Logo" className='w-24 h-10 object-contain'/>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Transforming data into insights
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/ultroxium/DataXpert" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://x.com/ultroxium" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} DataXpert. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

