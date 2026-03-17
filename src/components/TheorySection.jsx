import MathBlock from './MathBlock';

const PDF_TEX = String.raw`f(x) = \frac{1}{\sigma\sqrt{2\pi}} \, e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}`;
const Z_TEX = String.raw`Z = \frac{X - \mu}{\sigma}`;

export default function TheorySection() {
  return (
    <section id="theory" className="py-24 px-6 lg:pl-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="text-accent font-mono text-sm tracking-wider">CHAPTER 01</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-6">Understanding the<br /><span className="text-accent italic">Bell Curve</span></h2>
          <div className="w-20 h-1 bg-gold rounded-full" />
        </div>
        <div className="space-y-8 text-lg leading-relaxed text-slate">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
            <h3 className="font-display text-2xl font-semibold text-ink mb-4">What is the Normal Distribution?</h3>
            <p className="mb-4">The <strong>Normal Distribution</strong> (also called the Gaussian distribution) is a continuous probability distribution that is symmetric about the mean. It is the most widely used distribution in statistics and forms the foundation of many statistical methods used in business, finance, quality control, and social sciences.</p>
            <p>When data follows a normal distribution, it produces the characteristic &ldquo;bell-shaped&rdquo; curve. Most values cluster around the mean, with fewer observations in the tails.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
            <h3 className="font-display text-2xl font-semibold text-ink mb-4">The PDF Formula</h3>
            <p className="mb-4">The probability density function (PDF) of the normal distribution is:</p>
            <div className="bg-paper rounded-xl p-6 border border-gold/20">
              <MathBlock display tex={PDF_TEX} />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { sym: 'μ', name: 'Mean (mu)', desc: 'The centre of the distribution. Determines where the peak occurs.' },
                { sym: 'σ', name: 'Standard Deviation (sigma)', desc: 'Controls the spread. Larger σ makes the curve wider and shorter.' },
                { sym: 'π', name: 'Pi', desc: 'The mathematical constant ≈ 3.14159' },
                { sym: 'e', name: "Euler's Number", desc: 'The mathematical constant ≈ 2.71828' },
              ].map(({ sym, name, desc }) => (
                <div key={sym} className="flex items-start gap-3 p-4 bg-paper rounded-xl">
                  <span className="text-accent font-mono text-xl font-bold">{sym}</span>
                  <div><div className="font-semibold text-ink">{name}</div><div className="text-sm text-slate/70">{desc}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
            <h3 className="font-display text-2xl font-semibold text-ink mb-4">The Standard Normal Distribution</h3>
            <p className="mb-4">When μ = 0 and σ = 1, we get the <strong>Standard Normal Distribution</strong>. Any normal distribution can be converted to the standard normal using the <strong>Z-score</strong>:</p>
            <div className="bg-paper rounded-xl p-6 border border-gold/20">
              <MathBlock display tex={Z_TEX} />
            </div>
            <p className="mt-4">The Z-score tells you how many standard deviations a value is from the mean. This transformation allows us to use a single Z-table to find probabilities for any normal distribution.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
            <h3 className="font-display text-2xl font-semibold text-ink mb-4">Key Properties</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { t: 'Symmetry', d: 'Perfectly symmetric about the mean. Mean = Median = Mode.' },
                { t: 'Total Area = 1', d: 'The total area under the curve equals 1, representing 100% probability.' },
                { t: 'Asymptotic', d: 'The tails approach but never touch the x-axis, extending to ±∞.' },
                { t: 'Defined by Two Parameters', d: 'Completely described by just μ (location) and σ (scale).' },
                { t: 'Empirical Rule', d: '68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ of the mean.' },
                { t: 'Central Limit Theorem', d: 'Sample means tend toward normal distribution regardless of population shape.' },
              ].map(({ t, d }) => (
                <div key={t} className="p-4 bg-paper rounded-xl border border-gold/10">
                  <div className="font-semibold text-ink mb-1">{t}</div><div className="text-sm text-slate/70">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-ink rounded-2xl p-8 text-white">
            <h3 className="font-display text-2xl font-semibold mb-4">Business Applications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '💰', title: 'Finance', items: ['Stock returns modeling', 'Value at Risk (VaR)', 'Portfolio theory'] },
                { icon: '🏭', title: 'Operations', items: ['Quality control (Six Sigma)', 'Process capability', 'Inventory management'] },
                { icon: '📈', title: 'Marketing', items: ['Customer lifetime value', 'A/B test analysis', 'Demand forecasting'] },
              ].map(({ icon, title, items }) => (
                <div key={title} className="p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl mb-2">{icon}</div><div className="font-semibold mb-2">{title}</div>
                  <ul className="text-sm text-white/70 space-y-1">{items.map((item) => <li key={item}>• {item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
