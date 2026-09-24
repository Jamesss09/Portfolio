import { Home, User, Code, FolderOpen, BookOpen, Mail, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: FolderOpen },
    { name: 'Learning', href: '#learning', icon: BookOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border bg-bg-dark/95 backdrop-blur-sm hidden md:flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className={cn('flex flex-col h-full transition-all duration-300', collapsed ? 'p-3' : 'p-6')}>
        <div className={cn('mb-10 flex items-start gap-2', collapsed ? 'flex-col items-center' : 'flex-row justify-between')}>
          <div className={cn(collapsed && 'flex flex-col items-center gap-1')}>
            <h1 className="text-3xl font-bold text-primary-light">JC</h1>
            {!collapsed && <p className="text-sm text-text-secondary mt-1">James Carl Enquig</p>}
          </div>
          <button
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'grid place-items-center size-8 rounded-lg border border-border text-text-secondary hover:text-primary-light hover:border-primary transition-all',
              collapsed && 'mt-1'
            )}
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                title={collapsed ? item.name : undefined}
                className={cn(
                  'group flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary transition-all hover:bg-bg-card hover:text-text-primary hover:border-l-2 hover:border-primary',
                  collapsed && 'justify-center px-0 hover:border-l-0 border-l-2 border-transparent'
                )}
              >
                <Icon size={20} />
                {!collapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;