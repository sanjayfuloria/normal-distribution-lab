import { useState } from 'react';
import MathBlock from './MathBlock';
import { normalCDF } from '../lib/mathUtils';

const examples = [
  { id:1, title:'Quality Control: Light Bulb Lifespan', context:'A company manufactures light bulbs whose lifespans are normally distributed with a mean of 1200 hours and a standard deviation of 100 hours.', question:'What is the probability that a randomly selected bulb lasts more than 1350 hours?',
    steps:[
      { label:'Identify parameters', tex:String.raw`\mu = 1200, \quad \sigma = 100, \quad X = 1350` },
      { label:'Calculate Z-score', tex:String.raw`Z = \frac{X - \mu}{\sigma} = \frac{1350 - 1200}{100} = \frac{150}{100} = 1.50` },
      { label:'Find P(Z > 1.50)', tex:String.raw`P(Z > 1.50) = 1 - P(Z \leq 1.50) = 1 - 0.9332 = 0.0668` },
      { label:'Interpret', tex:String.raw`\text{There is a 6.68\% probability that a bulb lasts more than 1350 hours.}` },
    ], check:()=>1-normalCDF(1350,1200,100) },
  { id:2, title:'Finance: Portfolio Returns', context:'The annual returns of a mutual fund are normally distributed with a mean of 8% and a standard deviation of 12%.', question:'What is the probability that the fund returns between 2% and 15% in a given year?',
    steps:[
      { label:'Identify parameters', tex:String.raw`\mu = 8\%, \quad \sigma = 12\%, \quad X_1 = 2\%, \quad X_2 = 15\%` },
      { label:'Calculate Z-scores', tex:String.raw`Z_1 = \frac{2 - 8}{12} = -0.50 \qquad Z_2 = \frac{15 - 8}{12} = 0.583` },
      { label:'Find probability', tex:String.raw`P(-0.50 < Z < 0.583) = P(Z < 0.583) - P(Z < -0.50)` },
      { label:'Look up / compute', tex:String.raw`= 0.7201 - 0.3085 = 0.4116` },
      { label:'Interpret', tex:String.raw`\text{There is a 41.16\% probability of returns between 2\% and 15\%.}` },
    ], check:()=>normalCDF(15,8,12)-normalCDF(2,8,12) },
  { id:3, title:'HR: Employee Aptitude Scores', context:'An aptitude test taken by job applicants has scores that are normally distributed with μ = 500 and σ = 80.', question:'The company wants to interview only the top 10% of scorers. What is the minimum score required?',
    steps:[
      { label:'Set up the problem', tex:String.raw`P(X > x) = 0.10 \implies P(X \leq x) = 0.90` },
      { label:'Find the Z-value', tex:String.raw`Z_{0.90} = 1.2816 \quad \text{(from Z-table or inverse CDF)}` },
      { label:'Convert back to X', tex:String.raw`X = \mu + Z \cdot \sigma = 500 + 1.2816 \times 80 = 500 + 102.53` },
      { label:'Result', tex:String.raw`X \approx 602.53` },
      { label:'Interpret', tex:String.raw`\text{The company should set a minimum score of approximately 603.}` },
    ] },
  { id:4, title:'Marketing: Customer Spending', context:'Monthly spending of customers at an e-commerce platform is normally distributed with μ = ₹4,500 and σ = ₹1,200.', question:'What proportion of customers spend less than ₹3,000 per month?',
    steps:[
      { label:'Identify parameters', tex:String.raw`\mu = 4500, \quad \sigma = 1200, \quad X = 3000` },
      { label:'Calculate Z-score', tex:String.raw`Z = \frac{3000 - 4500}{1200} = \frac{-1500}{1200} = -1.25` },
      { label:'Find P(Z < -1.25)', tex:String.raw`P(Z < -1.25) = 0.1056` },
      { label:'Interpret', tex:String.raw`\text{About 10.56\% of customers spend less than Rs.3,000 per month.}` },
    ], check:()=>normalCDF(3000,4500,1200) },
  { id:5, title:'Operations: Delivery Time', context:"A logistics company's delivery times are normally distributed with μ = 5 days and σ = 1.2 days. They promise a refund if delivery exceeds 7 days.", question:'What percentage of deliveries will qualify for a refund?',
    steps:[
      { label:'Identify parameters', tex:String.raw`\mu = 5, \quad \sigma = 1.2, \quad X = 7` },
      { label:'Calculate Z-score', tex:String.raw`Z = \frac{7 - 5}{1.2} = \frac{2}{1.2} = 1.667` },
      { label:'Find P(Z > 1.667)', tex:String.raw`P(Z > 1.667) = 1 - P(Z \leq 1.667) = 1 - 0.9525 = 0.0475` },
      { label:'Interpret', tex:String.raw`\text{About 4.75\% of deliveries will exceed 7 days (qualify for refund).}` },
    ], check:()=>1-normalCDF(7,5,1.2) },
];

function ExampleCard({ example, isOpen, onToggle }) {
  const [showSteps, setShowSteps] = useState(false);
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen?'border-accent/30 shadow-lg':'border-gold/10 shadow-sm'}`}>
      <button onClick={onToggle} className="w-full text-left p-6 flex items-start justify-between gap-4">
        <div><div className="flex items-center gap-2 mb-1"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/10 text-accent font-mono text-sm font-bold">{example.id}</span><span className="font-display text-lg font-semibold text-ink">{example.title}</span></div><p className="text-sm text-slate/60 mt-1 line-clamp-1">{example.context}</p></div>
        <span className={`text-accent text-xl transition-transform ${isOpen?'rotate-45':''}`}>+</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 animate-in">
          <div className="bg-paper rounded-xl p-5 mb-4"><div className="text-sm font-semibold text-slate/50 mb-1">CONTEXT</div><p className="text-slate mb-3">{example.context}</p><div className="text-sm font-semibold text-accent mb-1">QUESTION</div><p className="text-ink font-semibold">{example.question}</p></div>
          <button onClick={()=>setShowSteps(!showSteps)} className="mb-4 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-colors">{showSteps?'Hide Solution':'Show Step-by-Step Solution'}</button>
          {showSteps && (
            <div className="space-y-3 animate-in">
              {example.steps.map((step,i)=>(
                <div key={i} className="flex gap-3"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-mono text-sm font-bold flex items-center justify-center mt-1">{i+1}</div><div className="flex-1 bg-paper rounded-xl p-4 border border-gold/10"><div className="text-sm font-semibold text-slate/60 mb-2">{step.label}</div><MathBlock display tex={step.tex}/></div></div>
              ))}
              {example.check && <div className="mt-4 p-4 bg-sage/10 border border-sage/20 rounded-xl"><div className="text-sm font-semibold text-sage mb-1">VERIFICATION</div><div className="font-mono text-sm text-slate">Computed value: {example.check().toFixed(4)} (matches ✓)</div></div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WorkedExamples() {
  const [openId, setOpenId] = useState(1);
  return (
    <section id="examples" className="py-24 px-6 lg:pl-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12"><span className="text-accent font-mono text-sm tracking-wider">CHAPTER 04</span><h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-6">Worked <span className="text-accent italic">Examples</span></h2><p className="text-lg text-slate max-w-2xl">Five detailed business scenarios with step-by-step solutions. Click each example to expand and reveal the solution.</p><div className="w-20 h-1 bg-gold rounded-full mt-6"/></div>
        <div className="space-y-4">{examples.map(ex=><ExampleCard key={ex.id} example={ex} isOpen={openId===ex.id} onToggle={()=>setOpenId(openId===ex.id?null:ex.id)}/>)}</div>
      </div>
    </section>
  );
}
