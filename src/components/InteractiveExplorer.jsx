import { useState, useMemo } from 'react';
import { normalPDF, normalCDF } from '../lib/mathUtils';

function NormalCurveSVG({ mean, stdDev, showArea, areaFrom, areaTo, compareMean, compareStd, showCompare }) {
  const width = 700, height = 360;
  const pad = { top: 20, right: 30, bottom: 50, left: 50 };
  const plotW = width - pad.left - pad.right, plotH = height - pad.top - pad.bottom;
  const xMin = Math.min(mean, showCompare ? compareMean : mean) - 4.5 * Math.max(stdDev, showCompare ? compareStd : stdDev);
  const xMax = Math.max(mean, showCompare ? compareMean : mean) + 4.5 * Math.max(stdDev, showCompare ? compareStd : stdDev);
  const maxY = Math.max(normalPDF(mean, mean, stdDev), showCompare ? normalPDF(compareMean, compareMean, compareStd) : 0) * 1.15;
  const toSX = (x) => pad.left + ((x - xMin) / (xMax - xMin)) * plotW;
  const toSY = (y) => pad.top + plotH - (y / maxY) * plotH;
  const genPath = (m, s) => { let d = ''; for (let i = 0; i <= 300; i++) { const x = xMin + (i / 300) * (xMax - xMin); const y = normalPDF(x, m, s); d += (i === 0 ? 'M' : 'L') + `${toSX(x).toFixed(2)},${toSY(y).toFixed(2)}`; } return d; };
  const genArea = (m, s, from, to) => { let d = `M${toSX(from).toFixed(2)},${toSY(0).toFixed(2)}`; const step = (to - from) / 200; for (let x = from; x <= to; x += step) { d += `L${toSX(x).toFixed(2)},${toSY(normalPDF(x, m, s)).toFixed(2)}`; } d += `L${toSX(to).toFixed(2)},${toSY(0).toFixed(2)}Z`; return d; };
  const mainPath = genPath(mean, stdDev);
  const cmpPath = showCompare ? genPath(compareMean, compareStd) : '';
  const cf = Math.max(areaFrom, xMin), ct = Math.min(areaTo, xMax);
  const aPath = showArea ? genArea(mean, stdDev, cf, ct) : '';
  const aProb = showArea ? (normalCDF(areaTo, mean, stdDev) - normalCDF(areaFrom, mean, stdDev)) : 0;
  const xTicks = []; const xStep = (xMax - xMin) / 8; for (let x = xMin + xStep; x < xMax; x += xStep) xTicks.push(parseFloat(x.toFixed(1)));
  const yTicks = []; for (let i = 1; i <= 4; i++) yTicks.push((maxY * i) / 5);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {yTicks.map(y => <line key={y} x1={pad.left} y1={toSY(y)} x2={width - pad.right} y2={toSY(y)} stroke="#d3c5a8" strokeWidth="0.5" strokeDasharray="4,4" />)}
      {showArea && <path d={aPath} fill="rgba(233,69,96,0.25)" />}
      <path d={mainPath} fill="none" stroke="#E94560" strokeWidth="3" strokeLinecap="round" />
      {showCompare && <path d={cmpPath} fill="none" stroke="#4A7C59" strokeWidth="2.5" strokeDasharray="8,4" strokeLinecap="round" />}
      <line x1={toSX(mean)} y1={pad.top} x2={toSX(mean)} y2={pad.top + plotH} stroke="#E94560" strokeWidth="1.5" strokeDasharray="6,4" />
      <text x={toSX(mean)} y={pad.top - 5} textAnchor="middle" fill="#E94560" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600">μ={mean}</text>
      {showCompare && (<><line x1={toSX(compareMean)} y1={pad.top} x2={toSX(compareMean)} y2={pad.top + plotH} stroke="#4A7C59" strokeWidth="1.5" strokeDasharray="6,4" /><text x={toSX(compareMean)} y={pad.top - 5} textAnchor="middle" fill="#4A7C59" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600">μ₂={compareMean}</text></>)}
      <line x1={pad.left} y1={pad.top + plotH} x2={width - pad.right} y2={pad.top + plotH} stroke="#1A1A2E" strokeWidth="1.5" />
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="#1A1A2E" strokeWidth="1.5" />
      {xTicks.map(x => (<g key={x}><line x1={toSX(x)} y1={pad.top + plotH} x2={toSX(x)} y2={pad.top + plotH + 6} stroke="#1A1A2E" /><text x={toSX(x)} y={pad.top + plotH + 20} textAnchor="middle" fill="#2C3E50" fontSize="11" fontFamily="JetBrains Mono">{x}</text></g>))}
      {yTicks.map(y => <text key={y} x={pad.left - 8} y={toSY(y) + 4} textAnchor="end" fill="#2C3E50" fontSize="10" fontFamily="JetBrains Mono">{y.toFixed(3)}</text>)}
      <text x={width / 2} y={height - 5} textAnchor="middle" fill="#2C3E50" fontSize="13" fontFamily="Source Sans 3" fontWeight="500">x</text>
      <text x={14} y={height / 2} textAnchor="middle" fill="#2C3E50" fontSize="13" fontFamily="Source Sans 3" fontWeight="500" transform={`rotate(-90, 14, ${height / 2})`}>f(x)</text>
      {showArea && aProb > 0.001 && <text x={toSX((cf + ct) / 2)} y={toSY(normalPDF((cf + ct) / 2, mean, stdDev) / 2)} textAnchor="middle" fill="#E94560" fontSize="14" fontFamily="JetBrains Mono" fontWeight="700">{(aProb * 100).toFixed(2)}%</text>}
      {showCompare && (<g><rect x={width-pad.right-170} y={pad.top+5} width="165" height="55" rx="8" fill="white" fillOpacity="0.9" stroke="#d3c5a8"/><line x1={width-pad.right-155} y1={pad.top+23} x2={width-pad.right-130} y2={pad.top+23} stroke="#E94560" strokeWidth="2.5"/><text x={width-pad.right-125} y={pad.top+27} fill="#1A1A2E" fontSize="11" fontFamily="Source Sans 3">μ={mean}, σ={stdDev}</text><line x1={width-pad.right-155} y1={pad.top+43} x2={width-pad.right-130} y2={pad.top+43} stroke="#4A7C59" strokeWidth="2.5" strokeDasharray="6,3"/><text x={width-pad.right-125} y={pad.top+47} fill="#1A1A2E" fontSize="11" fontFamily="Source Sans 3">μ={compareMean}, σ={compareStd}</text></g>)}
    </svg>
  );
}

export default function InteractiveExplorer() {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [showArea, setShowArea] = useState(false);
  const [areaFrom, setAreaFrom] = useState(-1);
  const [areaTo, setAreaTo] = useState(1);
  const [showCompare, setShowCompare] = useState(false);
  const [compareMean, setCompareMean] = useState(2);
  const [compareStd, setCompareStd] = useState(1.5);
  const probability = useMemo(() => showArea ? normalCDF(areaTo, mean, stdDev) - normalCDF(areaFrom, mean, stdDev) : 0, [showArea, areaFrom, areaTo, mean, stdDev]);

  return (
    <section id="interactive" className="py-24 px-6 lg:pl-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="text-accent font-mono text-sm tracking-wider">CHAPTER 02</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-6">Interactive <span className="text-accent italic">Explorer</span></h2>
          <p className="text-lg text-slate max-w-2xl">Adjust the sliders to see how mean (μ) and standard deviation (σ) shape the normal curve. Toggle the area shading to calculate probabilities.</p>
          <div className="w-20 h-1 bg-gold rounded-full mt-6" />
        </div>
        <div className="bg-paper rounded-2xl p-4 sm:p-6 border border-gold/20 shadow-sm mb-8">
          <NormalCurveSVG mean={mean} stdDev={stdDev} showArea={showArea} areaFrom={areaFrom} areaTo={areaTo} compareMean={compareMean} compareStd={compareStd} showCompare={showCompare} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-paper rounded-2xl p-6 border border-gold/20">
            <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-accent inline-block" />Primary Distribution</h3>
            <div className="space-y-5">
              <div><div className="flex justify-between mb-2"><label className="font-medium text-slate">Mean (μ)</label><span className="font-mono text-accent font-semibold">{mean}</span></div><input type="range" min="-5" max="5" step="0.1" value={mean} onChange={e => setMean(parseFloat(e.target.value))} /><div className="flex justify-between text-xs text-slate/50 mt-1"><span>-5</span><span>0</span><span>5</span></div></div>
              <div><div className="flex justify-between mb-2"><label className="font-medium text-slate">Standard Deviation (σ)</label><span className="font-mono text-accent font-semibold">{stdDev}</span></div><input type="range" min="0.2" max="4" step="0.1" value={stdDev} onChange={e => setStdDev(parseFloat(e.target.value))} /><div className="flex justify-between text-xs text-slate/50 mt-1"><span>0.2</span><span>2</span><span>4</span></div></div>
              <button onClick={() => { setMean(0); setStdDev(1); }} className="text-sm text-accent hover:underline font-medium">Reset to Standard Normal (μ=0, σ=1)</button>
            </div>
          </div>
          <div className="bg-paper rounded-2xl p-6 border border-gold/20">
            <h3 className="font-display text-xl font-semibold mb-4">Probability Calculator</h3>
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <div className={`w-12 h-7 rounded-full transition-colors relative ${showArea ? 'bg-accent' : 'bg-slate/20'}`} onClick={() => setShowArea(!showArea)}><div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${showArea ? 'translate-x-6' : 'translate-x-1'}`} /></div>
              <span className="font-medium">Show shaded area</span>
            </label>
            {showArea && (
              <div className="space-y-4 animate-in">
                <div><div className="flex justify-between mb-2"><label className="font-medium text-slate text-sm">From (x₁)</label><span className="font-mono text-accent font-semibold text-sm">{areaFrom}</span></div><input type="range" min={mean - 4 * stdDev} max={mean + 4 * stdDev} step="0.1" value={areaFrom} onChange={e => setAreaFrom(parseFloat(e.target.value))} /></div>
                <div><div className="flex justify-between mb-2"><label className="font-medium text-slate text-sm">To (x₂)</label><span className="font-mono text-accent font-semibold text-sm">{areaTo}</span></div><input type="range" min={mean - 4 * stdDev} max={mean + 4 * stdDev} step="0.1" value={areaTo} onChange={e => setAreaTo(parseFloat(e.target.value))} /></div>
                <div className="bg-white rounded-xl p-4 border border-gold/20">
                  <div className="text-sm text-slate/70 mb-1">P({areaFrom} &lt; X &lt; {areaTo})</div>
                  <div className="text-3xl font-display font-bold text-accent">{(probability * 100).toFixed(4)}%</div>
                  <div className="text-sm text-slate/50 mt-1">= {probability.toFixed(6)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 bg-paper rounded-2xl p-6 border border-gold/20">
          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <div className={`w-12 h-7 rounded-full transition-colors relative ${showCompare ? 'bg-sage' : 'bg-slate/20'}`} onClick={() => setShowCompare(!showCompare)}><div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${showCompare ? 'translate-x-6' : 'translate-x-1'}`} /></div>
            <span className="font-medium">Compare two distributions</span>
          </label>
          {showCompare && (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in"><div><div className="flex justify-between mb-2"><label className="font-medium text-slate text-sm">Mean₂ (μ₂)</label><span className="font-mono text-sage font-semibold text-sm">{compareMean}</span></div><input type="range" min="-5" max="5" step="0.1" value={compareMean} onChange={e => setCompareMean(parseFloat(e.target.value))} /></div><div><div className="flex justify-between mb-2"><label className="font-medium text-slate text-sm">Std Dev₂ (σ₂)</label><span className="font-mono text-sage font-semibold text-sm">{compareStd}</span></div><input type="range" min="0.2" max="4" step="0.1" value={compareStd} onChange={e => setCompareStd(parseFloat(e.target.value))} /></div></div>)}
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ l: 'Mean (μ)', v: mean.toFixed(1) }, { l: 'Std Dev (σ)', v: stdDev.toFixed(1) }, { l: 'Variance (σ²)', v: (stdDev * stdDev).toFixed(2) }, { l: 'Peak f(μ)', v: normalPDF(mean, mean, stdDev).toFixed(4) }].map(({ l, v }) => (
            <div key={l} className="bg-ink rounded-xl p-4 text-center"><div className="text-xs text-white/50 mb-1">{l}</div><div className="text-xl font-mono font-bold text-gold">{v}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}
