import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/ui/animated-shader-hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Learning from './components/Learning';
import GitHubContributions from './components/GitHubContributions';
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
            trustBadge={{ text: 'Open to learning & collaborating', icons: ['✨'] }}
            headline={{ line1: 'JAMES CARL', line2: 'ENQUIG' }}
            subtitle="4th Year IT Student · Aspiring Web Developer — crafting clean, responsive experiences with React, TypeScript, and a love for UI/UX."
            buttons={{
              primary: {
                text: 'Explore My Journey',
                onClick: () =>
                  document
                    .getElementById('about')
                    ?.scrollIntoView({ behavior: 'smooth' }),
              },
              secondary: {
                text: 'Get In Touch',
                onClick: () =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' }),
              },
            }}
          />
          <About />
          <Skills />
          <Projects />
          <Learning />
          <GitHubContributions />
          <Contact />
        </main>
      </div>
    </>
  );
}

export default App;