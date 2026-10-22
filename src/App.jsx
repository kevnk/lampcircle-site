import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Walkthrough from './components/Walkthrough';
import Manifesto from './components/Manifesto';
import Protocol from './components/Protocol';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Pin and trigger positions depend on text height, so measure again once the web fonts arrive.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only leading-snug focus:not-sr-only focus:fixed focus:left-s5 focus:top-s5 focus:z-[70] focus:rounded-full focus:bg-amber focus:px-s6 focus:py-s4 focus:font-bold focus:text-navy"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <Walkthrough />
        <Manifesto />
        <Protocol />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
