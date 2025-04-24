import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import './styles.css';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-black">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-xl text-red-600">EFREIFLIX</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a className="transition-colors hover:text-foreground/80" href="/browse">Parcourir</a>
            <a className="transition-colors hover:text-foreground/80" href="/series">Séries</a>
            <a className="transition-colors hover:text-foreground/80" href="/films">Films</a>
            <a className="transition-colors hover:text-foreground/80" href="/nouveautes">Nouveautés</a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <button className="size-9 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              <Search className="size-5" />
            </button>
            <button className="size-9 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              <Bell className="size-5" />
            </button>
            <button className="size-9 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              <User className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 