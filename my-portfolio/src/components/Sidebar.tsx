import { Home, User, Code, FolderOpen, BookOpen, Mail, Github, Linkedin } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: FolderOpen },
    { name: 'Learning', href: '#learning', icon: BookOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-bg-dark/95 backdrop-blur-sm hidden md:block">
      <div className="flex flex-col h-full p-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-primary-light">JC</h1>
          <p className="text-sm text-text-secondary mt-1">James Carl Enquig</p>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary transition-all hover:bg-bg-card hover:text-text-primary hover:border-l-2 hover:border-primary"
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </a>
            );
          })}
        </nav>
        <div className="flex gap-4 mt-6 justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary-light transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary-light transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;