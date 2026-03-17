import { useState } from 'react';
import { normalPDF } from '../lib/mathUtils';

function EmpiricalRuleSVG({ highlight }) {
  const width=700,height=320,pad={top:30,right:20,bottom:60,left:20},plotW=width-pad.left-pad.right,plotH=height-pad.top-pad.bottom;
  const xMin=-4,xMax=4,maxY=normalPDF(0,0,1)*1.1;
  const toX=x=>pad.left+((x-xMin)/(xMax-xMin))*plotW;
  const toY=y=>pad.top+plotH-(y/maxY)*plotH;
  const genCurve=()=>{let d='';for(let i=0;i<=400;i++){const x=xMin+(i/400)*(xMax-xMin);d+=(i===0?'M':'L')+`${toX(x).toFixed(2)},${toY(normalPDF(x,0,1)).toFixed(2)}`;}return d;};
  const genFill=(from,to)=>{let d=`M${toX(from).toFixed(2)},${toY(0).toFixed(2)}`;const step=(to-from)/200;for(let x=from;x<=to;x+=step)d+=`L${toX(x).toFixed(2)},${toY(normalPDF(x,0,1)).toFixed(2)}`;d+=`L${toX(to).toFixed(2)},${toY(0).toFixed(2)}Z`;return d;};
  const zones=[{from:-3,to:3,color:'rgba(212,168,83,0.15)',label:'99.7%',sigma:3},{from:-2,to:2,color:'rgba(74,124,89,0.2)',label:'95%',sigma:2},{from:-1,to:1,color:'rgba(233,69,96,0.25)',label:'68%',sigma:1}];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {zones.map(z=><path key={z.sigma} d={genFill(z.from,z.to)} fill={z.color} opacity={highlight===0||highlight===z.sigma?1:0.2} style={{transition:'opacity 0.3s'}}/>)}
      <path d={genCurve()} fill="none" stroke="#1A1A2E" strokeWidth="2.5"/>
      <line x1={pad.left} y1={toY(0)} x2={width-pad.right} y2={toY(0)} stroke="#1A1A2E" strokeWidth="1.5"/>
      {[-3,-2,-1,0,1,2,3].map(s=>(<g key={s}><line x1={toX(s)} y1={toY(0)} x2={toX(s)} y2={toY(0)+8} stroke="#1A1A2E"/><text x={toX(s)} y={toY(0)+22} textAnchor="middle" fill="#2C3E50" fontSize="12" fontFamily="JetBrains Mono">{s===0?'μ':`${s>0?'+':''}${s}σ`}</text></g>))}
      {zones.filter(z=>highlight===0||highlight===z.sigma).map(z=>{const yp=z.sigma===1?toY(0.15):z.sigma===2?toY(0.06):toY(0.015);return<text key={z.sigma} x={toX(0)} y={yp} textAnchor="middle" fill={z.sigma===1?'#E94560':z.sigma===2?'#4A7C59':'#D4A853'} fontSize="16" fontFamily="JetBrains Mono" fontWeight="700" style={{transition:'opacity 0.3s',opacity:highlight===0||highlight===z.sigma?1:0.2}}>{z.label}</text>;})}
      {[{from:-1,to:1,y:toY(0)+38,color:'#E94560',t:'68.27%',s:1},{from:-2,to:2,y:toY(0)+52,color:'#4A7C59',t:'95.45%',s:2},{from:-3,to:3,y:toY(0)+66,color:'#D4A853',t:'99.73%',s:3}].map(b=>(<g key={b.t} opacity={highlight===0||highlight===b.s?1:0.2} style={{transition:'opacity 0.3s'}}><line x1={toX(b.from)} y1={b.y} x2={toX(b.to)} y2={b.y} stroke={b.color} strokeWidth="2"/><line x1={toX(b.from)} y1={b.y-4} x2={toX(b.from)} y2={b.y+4} stroke={b.color} strokeWidth="2"/><line x1={toX(b.to)} y1={b.y-4} x2={toX(b.to)} y2={b.y+4} stroke={b.color} strokeWidth="2"/></g>))}
    </svg>
  );
}

export default function EmpiricalRuleSection() {
  const [highlight, setHighlight] = useState(0);
  const rules=[{sigma:1,pct:'68.27%',desc:'About 68% of data falls within one standard deviation of the mean.',bg:'bg-accent/10 border-accent/30'},{sigma:2,pct:'95.45%',desc:'About 95% of data falls within two standard deviations of the mean.',bg:'bg-sage/10 border-sage/30'},{sigma:3,pct:'99.73%',desc:'About 99.7% of data falls within three standard deviations of the mean.',bg:'bg-gold/10 border-gold/30'}];
  return (
    <section id="empirical" className="py-24 px-6 lg:pl-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12"><span className="text-accent font-mono text-sm tracking-wider">CHAPTER 03</span><h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-6">The <span className="text-accent italic">68-95-99.7</span> Rule</h2><p className="text-lg text-slate max-w-2xl">Also called the Empirical Rule or Three-Sigma Rule. Hover over each zone to highlight it on the curve.</p><div className="w-20 h-1 bg-gold rounded-full mt-6"/></div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gold/10 shadow-sm mb-8"><EmpiricalRuleSVG highlight={highlight}/></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {rules.map(({sigma,pct,desc,bg})=>(<div key={sigma} className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${bg} ${highlight===sigma?'scale-105 shadow-md':''}`} onMouseEnter={()=>setHighlight(sigma)} onMouseLeave={()=>setHighlight(0)}><div className="font-display text-3xl font-bold mb-1">{pct}</div><div className="font-mono text-sm mb-2">within ±{sigma}σ</div><p className="text-sm text-slate/70">{desc}</p></div>))}
        </div>
        <div className="bg-ink rounded-2xl p-8 text-white"><h3 className="font-display text-2xl font-semibold mb-4">Six Sigma in Business</h3><p className="text-white/80 leading-relaxed">The Six Sigma methodology gets its name from this rule. A &ldquo;six sigma&rdquo; process has defect rates at 6 standard deviations from the mean, corresponding to just 3.4 defects per million opportunities.</p><div className="mt-4 grid grid-cols-3 gap-4 text-center">{[{l:'3σ',d:'2,700 DPMO'},{l:'4σ',d:'63 DPMO'},{l:'6σ',d:'3.4 DPMO'}].map(({l,d})=>(<div key={l} className="bg-white/10 rounded-lg p-3"><div className="text-xl font-bold text-gold">{l}</div><div className="text-xs text-white/50">{d}</div></div>))}</div></div>
      </div>
    </section>
  );
}
