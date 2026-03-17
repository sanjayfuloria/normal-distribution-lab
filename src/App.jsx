import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import TheorySection from './components/TheorySection';
import InteractiveExplorer from './components/InteractiveExplorer';
import EmpiricalRuleSection from './components/EmpiricalRuleSection';
import WorkedExamples from './components/WorkedExamples';
import CalculatorSection from './components/CalculatorSection';
import QuizSection from './components/QuizSection';
import CodeSandbox from './components/CodeSandbox';

export default function App() {
  return (
    <main className="lg:pl-16">
      <Navigation />
      <HeroSection />
      <TheorySection />
      <InteractiveExplorer />
      <EmpiricalRuleSection />
      <WorkedExamples />
      <CalculatorSection />
      <QuizSection />
      <CodeSandbox />
      <footer className="py-16 px-6 lg:pl-24 bg-ink text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-3">Normal Distribution Lab</h2>
          <p className="text-white/50 text-sm mb-4">An interactive learning resource for Quantitative Methods</p>
          <p className="text-white/30 text-xs">ICFAI Foundation for Higher Education (IFHE), Hyderabad</p>
          <div className="mt-6 flex items-center justify-center gap-6 text-white/30 text-xs">
            <span>Built with React + Vite</span><span>•</span><span>Deployable on Vercel</span>
          </div>
        </div>
      </footer>
      <div className="h-16 lg:hidden" />
    </main>
  );
}
