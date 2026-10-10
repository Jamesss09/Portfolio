import { useState } from 'react';
import {
  BookOpen,
  Code,
  FolderOpen,
  Home,
  Mail,
  Menu,
  User,
  X,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Projects', href: '#projects', icon: FolderOpen },
  { name: 'Learning', href: '#learning', icon: BookOpen },
  { name: 'Contact', href: '#contact', icon: Mail },
];

/**
 * Sticky top navigation replacing the old sidebar — frees the side space
 * so content can use the full width. Brand left, links center/right,
 * theme switcher always reachable, hamburger menu on mobile.
 */
const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-dark/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
        {/* Brand */}
        <a href="#hero" className="flex shrink-0 items-center gap-3">
          <span className="font-display text-2xl font-medium tracking-tight text-primary-light">
            JC
          </span>
          <span className="hidden text-sm font-semibold leading-tight text-text-primary sm:block">
            James Carl Enquig
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary"
              >
                <Icon size={16} aria-hidden="true" />
                {item.name}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-lg border border-border text-text-secondary transition-colors hover:border-primary hover:text-primary-light md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="animate-fade-in border-t border-border px-6 pb-4 pt-2 md:hidden"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-text-secondary transition-colors',
                  'hover:bg-bg-card hover:text-text-primary'
                )}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="font-medium">{item.name}</span>
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default TopBar;
