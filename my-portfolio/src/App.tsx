import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ShaderBackground from './components/ShaderBackground';
import ThemeToggle from './components/ThemeToggle';
import { Hero } from './components/ui/hero-1';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Learning from './components/Learning';
import GitHubContributions from './components/GitHubContributions';
import Contact from './components/Contact';
import ChatWidget from './components/chat/ChatWidget';
import { useJameletChat } from './hooks/useJameletChat';
import { useTheme } from './hooks/useTheme';
import { profile } from '../shared/portfolio';
import { cn } from '@/lib/utils';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const jamelet = useJameletChat();
  // Applies the persisted theme (vibrant / minimalist) on load.
  useTheme();

  return (
    <>
      <div className="relative flex min-h-screen">
        <ShaderBackground />
        {/* Floating theme switcher — always reachable, incl. mobile (no sidebar) */}
        <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6">
          <ThemeToggle />
        </div>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
        />
        <main
          className={cn(
            'flex-1 overflow-x-hidden transition-all duration-300 relative z-10',
            sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
          )}
        >
          <Hero
            eyebrow="Welcome to my portfolio"
            title="JAMES CARL ENQUIG"
            subtitle={`${profile.education} · Aspiring Web Developer`}
            ctaLabel="Get In Touch"
            ctaHref="#contact"
          />
          <About />
          <Skills />
          <Projects />
          <Learning />
          <GitHubContributions />
          <Contact />
        </main>
      </div>

      {/* Phase 3: floating Jamelet companion */}
      <ChatWidget controller={jamelet} />
    </>
  );
}

export default App;