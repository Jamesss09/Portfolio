import Sidebar from './components/Sidebar';
import { Hero } from './components/ui/hero-1';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Learning from './components/Learning';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <>
      <div className="flex min-h-screen bg-bg-primary">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 overflow-x-hidden">
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