import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathBlock({ tex, display = false }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(tex, ref.current, {
          throwOnError: false,
          displayMode: display,
          output: 'html',
        });
      } catch (e) {
        console.warn('KaTeX render error:', e);
        ref.current.textContent = tex;
      }
    }
  }, [tex, display]);

  if (display) {
    return <div ref={ref} className="my-4 overflow-x-auto text-center" style={{ minHeight: '2em' }} />;
  }
  return <span ref={ref} />;
}
