import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'theory', label: 'Theory', icon: '📖' },
  { id: 'interactive', label: 'Explorer', icon: '🔬' },
  { id: 'empirical', label: '68-95-99.7', icon: '📊' },
  { id: 'examples', label: 'Examples', icon: '✏️' },
  { id: 'calculator', label: 'Calculator', icon: '🧮' },
  { id: 'quiz', label: 'Quiz', icon: '🎯' },
  { id: 'sandbox', label: 'Code Lab', icon: '💻' },
];

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-16 flex-col items-center justify-center z-50 bg-ink/95 backdrop-blur-sm">
        {sections.map(({ id, label, icon }) => (
          <a key={id} href={`#${id}`} title={label}
            className={`group relative flex items-center justify-center w-12 h-12 my-1 rounded-xl transition-all duration-300 ${active === id ? 'bg-accent text-white scale-110' : 'text-white/50 hover:text-white hover:bg-white/10'}`}>
            <span className="text-lg">{icon}</span>
            <span className="absolute left-full ml-3 px-3 py-1.5 bg-ink text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">{label}</span>
          </a>
        ))}
      </nav>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2">
          {sections.slice(0, 5).map(({ id, label, icon }) => (
            <a key={id} href={`#${id}`} className={`flex flex-col items-center px-2 py-1 rounded-lg transition-all ${active === id ? 'text-accent' : 'text-white/50'}`}>
              <span className="text-base">{icon}</span>
              <span className="text-[10px] mt-0.5">{label}</span>
            </a>
          ))}
          <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col items-center px-2 py-1 rounded-lg text-white/50">
            <span className="text-base">⋯</span><span className="text-[10px] mt-0.5">More</span>
          </button>
        </div>
        {isOpen && (
          <div className="absolute bottom-full left-0 right-0 bg-ink/95 backdrop-blur-sm border-t border-white/10 p-4">
            <div className="grid grid-cols-3 gap-3">
              {sections.slice(5).map(({ id, label, icon }) => (
                <a key={id} href={`#${id}`} onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center p-3 rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all">
                  <span className="text-xl mb-1">{icon}</span><span className="text-xs">{label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
