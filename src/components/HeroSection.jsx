import { useEffect, useRef } from 'react';
import { normalPDF } from '../lib/mathUtils';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame, t = 0;
    const draw = () => {
      const w = canvas.width = canvas.offsetWidth * 2;
      const h = canvas.height = canvas.offsetHeight * 2;
      ctx.clearRect(0, 0, w, h);
      const curves = [
        { mean: 0, std: 1, color: 'rgba(233,69,96,0.25)', phase: 0 },
        { mean: 0, std: 1.5, color: 'rgba(212,168,83,0.2)', phase: 2 },
        { mean: 0, std: 0.7, color: 'rgba(74,124,89,0.2)', phase: 4 },
      ];
      curves.forEach(({ mean, std, color, phase }) => {
        const am = mean + Math.sin(t * 0.5 + phase) * 0.5;
        const as = std + Math.sin(t * 0.3 + phase) * 0.15;
        ctx.beginPath();
        for (let px = 0; px <= w; px += 2) {
          const x = ((px / w) - 0.5) * 8;
          const y = normalPDF(x, am, as);
          const cy = h - (y * h * 2.5) - 20;
          px === 0 ? ctx.moveTo(px, cy) : ctx.lineTo(px, cy);
        }
        ctx.lineTo(w, h); ctx.closePath();
        ctx.fillStyle = color; ctx.fill();
        ctx.strokeStyle = color.replace(/[\d.]+\)$/, '0.6)');
        ctx.lineWidth = 2; ctx.stroke();
      });
      t += 0.02;
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-in">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/20">
          <span className="text-accent font-mono text-sm tracking-wider">QUANTITATIVE METHODS FOR MBA</span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-ink leading-[1.1] mb-6">
          The Normal<br /><span className="text-accent italic">Distribution</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          An interactive laboratory for exploring the most important probability distribution in statistics. Adjust parameters, solve problems, and write code — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#interactive" className="px-8 py-4 bg-accent text-white font-semibold rounded-2xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:-translate-y-0.5">Start Exploring →</a>
          <a href="#theory" className="px-8 py-4 bg-ink/5 text-ink font-semibold rounded-2xl hover:bg-ink/10 transition-all">Read Theory First</a>
        </div>
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[{ n: '7', l: 'Sections' }, { n: '5', l: 'Worked Examples' }, { n: '10', l: 'Quiz Questions' }, { n: '2', l: 'Code Languages' }].map(({ n, l }) => (
            <div key={l}><div className="text-3xl font-display font-bold text-accent">{n}</div><div className="text-sm text-slate/70 mt-1">{l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}
