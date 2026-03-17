import { useState, useRef, useCallback, useEffect } from 'react';

// ─── Python examples ───
const pyExamples = [
  {
    title: 'Basic Normal Distribution',
    desc: 'Compute probabilities and Z-scores using scipy.stats.',
    code: `from scipy import stats
import numpy as np

mu, sigma = 100, 15
dist = stats.norm(loc=mu, scale=sigma)

# Probabilities
p_less_120 = dist.cdf(120)
p_greater_85 = 1 - dist.cdf(85)
p_between = dist.cdf(115) - dist.cdf(85)

print(f"P(X < 120)       = {p_less_120:.4f}")
print(f"P(X > 85)        = {p_greater_85:.4f}")
print(f"P(85 < X < 115)  = {p_between:.4f}")

# Z-score
x_value = 130
z = (x_value - mu) / sigma
print(f"\\nZ-score for X={x_value}: {z:.4f}")

# Density at the mean
print(f"f(mu) = {dist.pdf(mu):.6f}")

# Generate samples and show summary stats
np.random.seed(42)
samples = dist.rvs(size=10000)
print(f"\\nSample mean:   {np.mean(samples):.2f}")
print(f"Sample std:    {np.std(samples):.2f}")
print(f"Sample min:    {np.min(samples):.2f}")
print(f"Sample max:    {np.max(samples):.2f}")`
  },
  {
    title: 'Inverse CDF & Percentiles',
    desc: 'Find values corresponding to given probabilities.',
    code: `from scipy import stats

mu, sigma = 500, 80
dist = stats.norm(loc=mu, scale=sigma)

# 90th percentile
x_90 = dist.ppf(0.90)
print(f"90th percentile: {x_90:.2f}")
print(f"Top 10% score above: {x_90:.0f}")

# Interquartile Range
q1 = dist.ppf(0.25)
q3 = dist.ppf(0.75)
print(f"\\nQ1 (25th pctl): {q1:.2f}")
print(f"Q3 (75th pctl): {q3:.2f}")
print(f"IQR: {q3 - q1:.2f}")

# 95% confidence interval
lower = dist.ppf(0.025)
upper = dist.ppf(0.975)
print(f"\\n95% interval: [{lower:.2f}, {upper:.2f}]")

# Percentile table
print("\\nPercentile Table:")
print("-" * 28)
for p in [0.01, 0.05, 0.10, 0.25, 0.50, 0.75, 0.90, 0.95, 0.99]:
    print(f"  {p*100:5.1f}%  -->  {dist.ppf(p):.2f}")`
  },
  {
    title: 'Central Limit Theorem',
    desc: 'Demonstrate CLT with an exponential population.',
    code: `import numpy as np
from scipy import stats

np.random.seed(42)

# Exponential population (clearly non-normal)
population = np.random.exponential(0.5, 100000)
print(f"Population mean: {np.mean(population):.4f}")
print(f"Population std:  {np.std(population):.4f}")
print(f"Population skew: {stats.skew(population):.4f}")
print()

# Simulate sample means for different sample sizes
for n in [5, 15, 30, 100]:
    sample_means = [np.mean(np.random.choice(population, n))
                    for _ in range(3000)]
    sm = np.array(sample_means)

    theo_std = np.std(population) / np.sqrt(n)

    print(f"n = {n:3d}:")
    print(f"  Mean of means:     {np.mean(sm):.4f}")
    print(f"  Std of means:      {np.std(sm):.4f}")
    print(f"  Theoretical std:   {theo_std:.4f}")
    print(f"  Skewness of means: {stats.skew(sm):.4f}")
    print(f"  --> Converging to normal!\\n")`
  },
  {
    title: 'Quality Control (Six Sigma)',
    desc: 'Process capability analysis.',
    code: `from scipy import stats

# Manufacturing process parameters
target = 10.0     # mm (target diameter)
mu = 10.02        # actual process mean
sigma = 0.015     # process std dev
USL = 10.05       # Upper Specification Limit
LSL = 9.95        # Lower Specification Limit

# Capability Indices
Cp = (USL - LSL) / (6 * sigma)
Cpk = min((USL - mu) / (3 * sigma),
          (mu - LSL) / (3 * sigma))

# Defect rates
p_above = 1 - stats.norm.cdf(USL, mu, sigma)
p_below = stats.norm.cdf(LSL, mu, sigma)
total_defect = p_above + p_below
dpmo = total_defect * 1_000_000

print("=== Process Capability Report ===")
print(f"Process Mean:     {mu} mm")
print(f"Process Std Dev:  {sigma} mm")
print(f"Target:           {target} mm")
print(f"LSL / USL:        [{LSL}, {USL}] mm")
print()
print(f"Cp  = {Cp:.4f}")
print(f"Cpk = {Cpk:.4f}")
print()
print(f"P(X > USL) = {p_above:.6f}")
print(f"P(X < LSL) = {p_below:.6f}")
print(f"Total defect rate = {total_defect:.6f}")
print(f"DPMO = {dpmo:.1f}")

if Cpk >= 2.0:
    print("\\nStatus: Six Sigma capable!")
elif Cpk >= 1.33:
    print("\\nStatus: Capable (Cpk >= 1.33)")
else:
    print("\\nStatus: Needs improvement")`
  },
];

// ─── R examples ───
const rExamples = [
  {
    title: 'Basic Normal Distribution',
    desc: 'Compute probabilities and Z-scores in R.',
    code: `mu <- 100
sigma <- 15

# Probabilities
cat("P(X < 120)      =", round(pnorm(120, mu, sigma), 4), "\\n")
cat("P(X > 85)       =", round(1 - pnorm(85, mu, sigma), 4), "\\n")
cat("P(85 < X < 115) =", round(pnorm(115, mu, sigma) - pnorm(85, mu, sigma), 4), "\\n")

# Z-score
z <- (130 - mu) / sigma
cat("\\nZ-score for X=130:", round(z, 4), "\\n")

# Density at the mean
cat("f(mu) =", round(dnorm(mu, mu, sigma), 6), "\\n")

# Generate samples
set.seed(42)
samples <- rnorm(10000, mu, sigma)
cat("\\nSample mean:  ", round(mean(samples), 2), "\\n")
cat("Sample std:   ", round(sd(samples), 2), "\\n")
cat("Sample min:   ", round(min(samples), 2), "\\n")
cat("Sample max:   ", round(max(samples), 2), "\\n")`
  },
  {
    title: 'Inverse CDF & Percentiles',
    desc: 'Find values using qnorm.',
    code: `mu <- 500
sigma <- 80

# 90th percentile
cat("90th percentile:", round(qnorm(0.90, mu, sigma), 2), "\\n")

# IQR
q1 <- qnorm(0.25, mu, sigma)
q3 <- qnorm(0.75, mu, sigma)
cat("\\nQ1:", round(q1, 2), "\\n")
cat("Q3:", round(q3, 2), "\\n")
cat("IQR:", round(q3 - q1, 2), "\\n")

# 95% interval
cat("\\n95% interval: [",
    round(qnorm(0.025, mu, sigma), 2), ",",
    round(qnorm(0.975, mu, sigma), 2), "]\\n")

# Percentile table
cat("\\nPercentile Table:\\n")
cat(strrep("-", 28), "\\n")
for (p in c(0.01, 0.05, 0.10, 0.25, 0.50, 0.75, 0.90, 0.95, 0.99)) {
  cat(sprintf("  %5.1f%%  -->  %7.2f\\n", p * 100, qnorm(p, mu, sigma)))
}`
  },
  {
    title: 'Central Limit Theorem',
    desc: 'CLT simulation with exponential population.',
    code: `set.seed(42)
population <- rexp(100000, rate = 2)

cat("Population mean:", round(mean(population), 4), "\\n")
cat("Population std: ", round(sd(population), 4), "\\n\\n")

for (n in c(5, 15, 30, 100)) {
  means <- replicate(3000, mean(sample(population, n, TRUE)))
  theo_sd <- sd(population) / sqrt(n)

  cat(sprintf("n = %3d:\\n", n))
  cat(sprintf("  Mean of means:    %7.4f\\n", mean(means)))
  cat(sprintf("  Std of means:     %7.4f\\n", sd(means)))
  cat(sprintf("  Theoretical std:  %7.4f\\n", theo_sd))
  cat("  --> Converging to normal!\\n\\n")
}`
  },
  {
    title: 'Quality Control (Six Sigma)',
    desc: 'Process capability analysis in R.',
    code: `mu <- 10.02
sigma <- 0.015
USL <- 10.05
LSL <- 9.95

Cp <- (USL - LSL) / (6 * sigma)
Cpk <- min((USL - mu) / (3 * sigma),
           (mu - LSL) / (3 * sigma))

p_above <- 1 - pnorm(USL, mu, sigma)
p_below <- pnorm(LSL, mu, sigma)
dpmo <- (p_above + p_below) * 1e6

cat("=== Process Capability Report ===\\n")
cat("Process Mean:    ", mu, "mm\\n")
cat("Process Std Dev: ", sigma, "mm\\n")
cat("LSL / USL:       [", LSL, ",", USL, "] mm\\n\\n")
cat("Cp  =", round(Cp, 4), "\\n")
cat("Cpk =", round(Cpk, 4), "\\n\\n")
cat("P(X > USL) =", format(p_above, digits = 6), "\\n")
cat("P(X < LSL) =", format(p_below, digits = 6), "\\n")
cat("DPMO =", round(dpmo, 1), "\\n")

if (Cpk >= 2.0) {
  cat("\\nStatus: Six Sigma capable!\\n")
} else if (Cpk >= 1.33) {
  cat("\\nStatus: Capable (Cpk >= 1.33)\\n")
} else {
  cat("\\nStatus: Needs improvement\\n")
}`
  },
];

// ─── Copy button ───
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/70 text-xs rounded-lg transition-all font-mono"
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  );
}

// ─── Python runner (Pyodide) ───
let pyodideInstance = null;
let pyodideLoading = false;
const pyodideLoadCallbacks = [];

async function loadPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) {
    return new Promise((resolve) => pyodideLoadCallbacks.push(resolve));
  }
  pyodideLoading = true;

  // Load Pyodide script
  if (!document.getElementById('pyodide-script')) {
    const script = document.createElement('script');
    script.id = 'pyodide-script';
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
    document.head.appendChild(script);
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  }

  // Initialize
  pyodideInstance = await window.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
  });
  await pyodideInstance.loadPackage(['numpy', 'scipy']);

  pyodideLoadCallbacks.forEach((cb) => cb(pyodideInstance));
  pyodideLoadCallbacks.length = 0;
  return pyodideInstance;
}

async function runPython(code) {
  const pyodide = await loadPyodide();

  // Capture stdout
  pyodide.runPython(`
import sys, io
_capture_buf = io.StringIO()
sys.stdout = _capture_buf
sys.stderr = _capture_buf
`);

  try {
    await pyodide.runPythonAsync(code);
    const output = pyodide.runPython('_capture_buf.getvalue()');
    pyodide.runPython('sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__');
    return { output, error: null };
  } catch (err) {
    pyodide.runPython('sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__');
    const partial = pyodide.runPython('_capture_buf.getvalue()');
    return { output: partial, error: err.message };
  }
}

// ─── R runner (webR) ───
let webRInstance = null;
let webRLoading = false;
const webRLoadCallbacks = [];

async function loadWebR() {
  if (webRInstance) return webRInstance;
  if (webRLoading) {
    return new Promise((resolve) => webRLoadCallbacks.push(resolve));
  }
  webRLoading = true;

  const { WebR } = await import('https://webr.r-wasm.org/latest/webr.mjs');
  webRInstance = new WebR();
  await webRInstance.init();

  webRLoadCallbacks.forEach((cb) => cb(webRInstance));
  webRLoadCallbacks.length = 0;
  return webRInstance;
}

async function runR(code) {
  try {
    const webR = await loadWebR();

    // Capture output using capture.output
    const shelter = await new webR.Shelter();
    const result = await shelter.captureR(code, { withAutoprint: true });

    let output = '';
    for (const item of result.output) {
      if (item.type === 'stdout' || item.type === 'message') {
        output += item.data + '\n';
      }
    }

    shelter.purge();
    return { output: output.trimEnd(), error: null };
  } catch (err) {
    return { output: '', error: err.message };
  }
}

// ─── Terminal output component ───
function Terminal({ output, error, isRunning, loadingStage }) {
  const termRef = useRef(null);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [output, error, isRunning]);

  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-white/5">
      <div className="flex items-center gap-2 px-4 py-2 bg-black/90 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-white/40 text-xs font-mono ml-2">Output</span>
        {isRunning && (
          <span className="ml-auto flex items-center gap-2 text-gold text-xs font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse" />
            {loadingStage}
          </span>
        )}
      </div>
      <div
        ref={termRef}
        className="bg-black/95 p-4 font-mono text-sm leading-relaxed max-h-[350px] overflow-y-auto min-h-[120px]"
      >
        {!output && !error && !isRunning && (
          <span className="text-white/25 italic">Click ▶ Run to execute the code...</span>
        )}
        {output && (
          <pre className="text-green-300/90 whitespace-pre-wrap">{output}</pre>
        )}
        {error && (
          <pre className="text-red-400/90 whitespace-pre-wrap mt-2">Error: {error}</pre>
        )}
        {isRunning && !output && (
          <div className="flex items-center gap-2 text-white/40">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>{loadingStage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───
export default function CodeSandbox() {
  const [lang, setLang] = useState('python');
  const [idx, setIdx] = useState(0);
  const [editedCode, setEditedCode] = useState(null); // null = use example code
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const textareaRef = useRef(null);

  const examples = lang === 'python' ? pyExamples : rExamples;
  const cur = examples[idx];
  const activeCode = editedCode !== null ? editedCode : cur.code;

  // Reset edited code when switching examples or language
  const switchExample = (i) => { setIdx(i); setEditedCode(null); setOutput(''); setError(null); };
  const switchLang = (l) => { setLang(l); setIdx(0); setEditedCode(null); setOutput(''); setError(null); };

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setError(null);

    try {
      if (lang === 'python') {
        setLoadingStage('Loading Python runtime...');
        const result = await runPython(activeCode);
        setOutput(result.output);
        setError(result.error);
      } else {
        setLoadingStage('Loading R runtime...');
        const result = await runR(activeCode);
        setOutput(result.output);
        setError(result.error);
      }
    } catch (err) {
      setError(`Runtime failed to load: ${err.message}`);
    } finally {
      setIsRunning(false);
      setLoadingStage('');
    }
  }, [lang, activeCode]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [activeCode]);

  return (
    <section id="sandbox" className="py-24 px-6 lg:pl-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-accent font-mono text-sm tracking-wider">CHAPTER 07</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-6">
            Code <span className="text-accent italic">Laboratory</span>
          </h2>
          <p className="text-lg text-slate max-w-2xl">
            Run Python and R code directly in your browser. Edit the examples, hit
            <span className="inline-flex items-center mx-1 px-2 py-0.5 bg-sage/10 text-sage rounded-md font-mono text-sm font-semibold">▶ Run</span>
            and see results instantly. No installation needed.
          </p>
          <div className="w-20 h-1 bg-gold rounded-full mt-6" />
        </div>

        {/* Language selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => switchLang('python')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              lang === 'python' ? 'bg-[#3776AB] text-white shadow-lg' : 'bg-paper text-slate border border-gold/20 hover:bg-white'
            }`}
          >
            🐍 Python
            <span className="text-[10px] opacity-60 font-normal ml-1">(Pyodide)</span>
          </button>
          <button
            onClick={() => switchLang('r')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              lang === 'r' ? 'bg-[#276DC3] text-white shadow-lg' : 'bg-paper text-slate border border-gold/20 hover:bg-white'
            }`}
          >
            📊 R
            <span className="text-[10px] opacity-60 font-normal ml-1">(webR)</span>
          </button>
        </div>

        {/* Example tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => switchExample(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                idx === i ? 'bg-ink text-white' : 'bg-paper text-slate border border-gold/20 hover:bg-white'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </div>

        {/* Code editor + controls */}
        <div className="code-block">
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-slate-800 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-white/50 text-sm font-mono">
                {cur.title}.{lang === 'python' ? 'py' : 'R'}
              </span>
              {editedCode !== null && (
                <span className="text-gold/60 text-xs font-mono">(edited)</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {editedCode !== null && (
                <button
                  onClick={() => setEditedCode(null)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/50 text-xs rounded-lg transition-all font-mono"
                >
                  Reset
                </button>
              )}
              <CopyBtn text={activeCode} />
              <button
                onClick={handleRun}
                disabled={isRunning}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-mono text-sm font-semibold transition-all ${
                  isRunning
                    ? 'bg-gold/30 text-gold/60 cursor-wait'
                    : 'bg-sage hover:bg-sage/90 text-white shadow-md shadow-sage/20 hover:shadow-lg'
                }`}
              >
                {isRunning ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Running...
                  </>
                ) : (
                  <>▶ Run</>
                )}
              </button>
            </div>
          </div>

          {/* Editable code area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={activeCode}
              onChange={(e) => setEditedCode(e.target.value)}
              spellCheck={false}
              className="w-full bg-[#1e293b] text-gray-200 font-mono text-sm leading-relaxed p-5 pl-16 resize-none focus:outline-none min-h-[200px] max-h-[500px] overflow-y-auto"
              style={{ tabSize: 4 }}
            />
            {/* Line numbers overlay */}
            <div className="absolute top-0 left-0 p-5 pr-2 pointer-events-none select-none">
              {activeCode.split('\n').map((_, i) => (
                <div key={i} className="text-white/20 font-mono text-sm leading-relaxed text-right" style={{ width: '2rem' }}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal output */}
        <Terminal output={output} error={error} isRunning={isRunning} loadingStage={loadingStage} />

        {/* Description */}
        <div className="mt-4 bg-paper rounded-xl p-5 border border-gold/20">
          <h4 className="font-semibold text-ink mb-1">{cur.title}</h4>
          <p className="text-slate/70 text-sm">{cur.desc}</p>
          <p className="text-slate/40 text-xs mt-3">
            {lang === 'python'
              ? '⚡ Powered by Pyodide — Python + NumPy + SciPy compiled to WebAssembly. First run loads the runtime (~15s).'
              : '⚡ Powered by webR — R compiled to WebAssembly. First run loads the runtime (~10s).'
            }
          </p>
        </div>

        {/* Quick reference cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h4 className="font-display text-lg font-semibold mb-3">🐍 Python Quick Reference</h4>
            <div className="space-y-2 font-mono text-sm">
              {[
                ['PDF (density)', 'stats.norm.pdf(x, loc=μ, scale=σ)'],
                ['CDF (probability)', 'stats.norm.cdf(x, loc=μ, scale=σ)'],
                ['Inverse CDF', 'stats.norm.ppf(p, loc=μ, scale=σ)'],
                ['Random samples', 'stats.norm.rvs(loc=μ, scale=σ, size=n)'],
              ].map(([label, code]) => (
                <div key={label} className="p-2 bg-paper rounded-lg">
                  <div className="text-accent text-xs mb-1">{label}</div>
                  <code className="text-slate">{code}</code>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h4 className="font-display text-lg font-semibold mb-3">📊 R Quick Reference</h4>
            <div className="space-y-2 font-mono text-sm">
              {[
                ['PDF (density)', 'dnorm(x, mean=μ, sd=σ)'],
                ['CDF (probability)', 'pnorm(x, mean=μ, sd=σ)'],
                ['Inverse CDF', 'qnorm(p, mean=μ, sd=σ)'],
                ['Random samples', 'rnorm(n, mean=μ, sd=σ)'],
              ].map(([label, code]) => (
                <div key={label} className="p-2 bg-paper rounded-lg">
                  <div className="text-accent text-xs mb-1">{label}</div>
                  <code className="text-slate">{code}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
