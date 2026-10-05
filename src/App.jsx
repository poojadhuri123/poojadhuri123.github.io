import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveTerminal from './components/InteractiveTerminal';
import ApiTesterPlayground from './components/ApiTesterPlayground';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ArchitectureFlow from './components/ArchitectureFlow';
import ExperienceTimeline from './components/ExperienceTimeline';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const toggleTheme = () => {
    setIsLightTheme((prev) => {
      const nextTheme = !prev;
      if (nextTheme) {
        document.documentElement.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
      }
      return nextTheme;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const scrollToApiTester = () => {
    const el = document.getElementById('api-tester');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation Header */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        isLightTheme={isLightTheme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenApiTester={scrollToApiTester}
        />

        <SkillsSection />

        <ProjectsSection />

        <ApiTesterPlayground />

        <ArchitectureFlow />

        <ExperienceTimeline />

        <TestimonialsSection />

        <ContactSection onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Artisan Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast mono" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
            {toastMessage}
          </div>
        </div>
      )}

    </div>
  );
}
