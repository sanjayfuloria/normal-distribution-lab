import { useState, useMemo } from 'react';
import { normalCDF, normalPDF, zScore, normalInvCDF } from '../lib/mathUtils';

export default function CalculatorSection() {
  const [mode,setMode]=useState('probability');
  const [mu,setMu]=useState('0');const [sigma,setSigma]=useState('1');
  const [xVal,setXVal]=useState('');const [xVal2,setXVal2]=useState('');
  const [probType,setProbType]=useState('less');const [targetProb,setTargetProb]=useState('');

  const result = useMemo(()=>{
    const m=parseFloat(mu),s=parseFloat(sigma);
    if(isNaN(m)||isNaN(s)||s<=0)return null;
    if(mode==='probability'){const x=parseFloat(xVal);if(isNaN(x))return null;if(probType==='less'){const p=normalCDF(x,m,s),z=zScore(x,m,s);return{prob:p,z,desc:`P(X < ${x})`,formula:`Z = (${x} - ${m}) / ${s} = ${z.toFixed(4)}`};}else if(probType==='greater'){const p=1-normalCDF(x,m,s),z=zScore(x,m,s);return{prob:p,z,desc:`P(X > ${x})`,formula:`Z = (${x} - ${m}) / ${s} = ${z.toFixed(4)}`};}else{const x2=parseFloat(xVal2);if(isNaN(x2))return null;const p=normalCDF(x2,m,s)-normalCDF(x,m,s);return{prob:p,desc:`P(${x} < X < ${x2})`,formula:`Z₁ = ${zScore(x,m,s).toFixed(4)}, Z₂ = ${zScore(x2,m,s).toFixed(4)}`};}}
    else if(mode==='inverse'){const p=parseFloat(targetProb);if(isNaN(p)||p<=0||p>=1)return null;const x=normalInvCDF(p,m,s);return{x,desc:`X such that P(X ≤ x) = ${p}`,formula:`x = ${x.toFixed(4)}`};}
    else{const x=parseFloat(xVal);if(isNaN(x))return null;const z=zScore(x,m,s),p=normalCDF(x,m,s);return{z,prob:p,desc:`Z-score of X = ${x}`,formula:`Z = (${x} - ${m}) / ${s} = ${z.toFixed(4)}`};}
  },[mode,mu,sigma,xVal,xVal2,probType,targetProb]);

  return (
    <section id="calculator" className="py-24 px-6 lg:pl-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12"><span className="text-accent font-mono text-sm tracking-wider">CHAPTER 05</span><h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-6">Probability <span className="text-accent italic">Calculator</span></h2><p className="text-lg text-slate max-w-2xl">Compute exact probabilities, inverse values, and Z-scores.</p><div className="w-20 h-1 bg-gold rounded-full mt-6"/></div>
        <div className="flex gap-2 mb-8 bg-paper p-1.5 rounded-xl w-fit border border-gold/20">
          {[{k:'probability',l:'P(X)',t:'Find Probability'},{k:'inverse',l:'X⁻¹',t:'Inverse (Find X)'},{k:'zscore',l:'Z',t:'Z-Score'}].map(({k,l,t})=><button key={k} onClick={()=>setMode(k)} className={`px-5 py-2.5 rounded-lg font-medium transition-all text-sm ${mode===k?'bg-accent text-white shadow-md':'text-slate hover:bg-white'}`}><span className="font-mono mr-1.5">{l}</span> {t}</button>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-display text-xl font-semibold mb-4">Input Parameters</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><label className="text-sm font-medium text-slate/60 mb-1 block">Mean (μ)</label><input type="number" value={mu} onChange={e=>setMu(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-paper font-mono text-lg focus:outline-none focus:border-accent"/></div>
              <div><label className="text-sm font-medium text-slate/60 mb-1 block">Std Dev (σ)</label><input type="number" value={sigma} onChange={e=>setSigma(e.target.value)} min="0.01" step="0.1" className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-paper font-mono text-lg focus:outline-none focus:border-accent"/></div>
            </div>
            {mode==='probability'&&(<><div className="flex gap-2 mb-4">{[{k:'less',l:'P(X < x)'},{k:'greater',l:'P(X > x)'},{k:'between',l:'P(a < X < b)'}].map(({k,l})=><button key={k} onClick={()=>setProbType(k)} className={`flex-1 py-2 rounded-lg text-sm font-mono font-medium transition-all ${probType===k?'bg-ink text-white':'bg-paper text-slate border border-gold/20'}`}>{l}</button>)}</div><div className={`grid ${probType==='between'?'grid-cols-2':'grid-cols-1'} gap-4`}><div><label className="text-sm font-medium text-slate/60 mb-1 block">{probType==='between'?'Lower bound (a)':'Value (x)'}</label><input type="number" value={xVal} onChange={e=>setXVal(e.target.value)} step="0.1" className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-paper font-mono text-lg focus:outline-none focus:border-accent" placeholder="Enter value"/></div>{probType==='between'&&<div><label className="text-sm font-medium text-slate/60 mb-1 block">Upper bound (b)</label><input type="number" value={xVal2} onChange={e=>setXVal2(e.target.value)} step="0.1" className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-paper font-mono text-lg focus:outline-none focus:border-accent" placeholder="Enter value"/></div>}</div></>)}
            {mode==='inverse'&&<div><label className="text-sm font-medium text-slate/60 mb-1 block">Target Probability (0 &lt; p &lt; 1)</label><input type="number" value={targetProb} onChange={e=>setTargetProb(e.target.value)} min="0.001" max="0.999" step="0.01" className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-paper font-mono text-lg focus:outline-none focus:border-accent" placeholder="e.g. 0.95"/></div>}
            {mode==='zscore'&&<div><label className="text-sm font-medium text-slate/60 mb-1 block">Value (X)</label><input type="number" value={xVal} onChange={e=>setXVal(e.target.value)} step="0.1" className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-paper font-mono text-lg focus:outline-none focus:border-accent" placeholder="Enter value"/></div>}
          </div>
          <div className="bg-ink rounded-2xl p-6 text-white">
            <h3 className="font-display text-xl font-semibold mb-4">Result</h3>
            {result?(<div className="space-y-4 animate-in"><div className="text-sm text-white/50">{result.desc}</div>{(mode==='probability')&&<div><div className="text-xs text-white/40 mb-1">PROBABILITY</div><div className="text-4xl font-display font-bold text-gold">{(result.prob*100).toFixed(4)}%</div><div className="text-sm text-white/50 font-mono mt-1">= {result.prob.toFixed(6)}</div></div>}{mode==='inverse'&&<div><div className="text-xs text-white/40 mb-1">VALUE (X)</div><div className="text-4xl font-display font-bold text-gold">{result.x.toFixed(4)}</div></div>}{mode==='zscore'&&<><div><div className="text-xs text-white/40 mb-1">Z-SCORE</div><div className="text-4xl font-display font-bold text-gold">{result.z.toFixed(4)}</div></div><div><div className="text-xs text-white/40 mb-1">CUMULATIVE PROBABILITY</div><div className="text-2xl font-display font-bold text-accent">{(result.prob*100).toFixed(4)}%</div></div></>}<div className="pt-4 border-t border-white/10"><div className="text-xs text-white/40 mb-2">CALCULATION</div><div className="font-mono text-sm text-white/70 bg-white/5 rounded-lg p-3">{result.formula}</div></div></div>)
            :(<div className="flex items-center justify-center h-48 text-white/30 text-center"><div><div className="text-4xl mb-2">🧮</div><div>Enter values on the left<br/>to see results here</div></div></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
