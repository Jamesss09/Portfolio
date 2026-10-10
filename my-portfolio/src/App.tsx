import TopBar from './components/TopBar';
import ShaderBackground from './components/ShaderBackground';
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
import './App.css';

function App() {
  const jamelet = useJameletChat();
  // Applies the persisted theme (vibrant / minimalist) on load.
  useTheme();

  return (
    <>
      <div className="relative min-h-screen">
        <ShaderBackground />
        <TopBar />
        <main className="relative z-10 flex-1 overflow-x-hidden">
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
