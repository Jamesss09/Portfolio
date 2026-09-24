import { useState } from 'react';
import Sidebar from './components/Sidebar';
import { Hero } from './components/ui/hero-1';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Learning from './components/Learning';
import Contact from './components/Contact';
import { cn } from '@/lib/utils';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <div className="flex min-h-screen bg-bg-primary">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
        />
        <main
          className={cn(
            'flex-1 overflow-x-hidden transition-all duration-300',
            sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
          )}
        >
          <Hero
            eyebrow="Welcome to my portfolio"
            title="JAMES CARL ENQUIG"
            subtitle="4th Year IT Student · Aspiring Web Developer"
            ctaLabel="Get In Touch"
            ctaHref="#contact"
          />
          <About />
          <Skills />
          <Projects />
          <Learning />
          <Contact />
        </main>
      </div>
    </>
  );
}

export default App;