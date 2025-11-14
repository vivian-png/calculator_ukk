"use client";
import { useState } from 'react';

/**
 * Simple mobile-friendly calculator
 * - supports + - * / and decimal
 * - simple eval is used; avoid entering untrusted code
 */
const Calculator = () => {
  const [display, setDisplay] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const press = (s: string) => setDisplay(d => d + s);
  const clear = () => { setDisplay(''); setAnswer(''); };

  const compute = () => {
    try {
      // basic evaluation
      // Note: using Function for simplicity in this small demo
      const res = Function(`return (${display || '0'})`)();
      setAnswer(String(res));
    } catch {
      setAnswer('Error');
    }
  };

  // apply trigonometric functions (input in degrees)
  const applyTrig = (fn: 'sin' | 'cos' | 'tan') => {
    const val = parseFloat(display || '0');
    if (isNaN(val)) {
      setAnswer('Error');
      return;
    }
    const rad = (val * Math.PI) / 180;
    let res = 0;
    if (fn === 'sin') res = Math.sin(rad);
    if (fn === 'cos') res = Math.cos(rad);
    if (fn === 'tan') res = Math.tan(rad);

    // handle tan singularities (near ±90°, ±270°, etc.)
    if (fn === 'tan' && !Number.isFinite(res)) {
      setAnswer('Undefined');
      return;
    }

    // format: treat near-zero as 0, round to 8 decimals, remove trailing zeros
    // format with trailing zero removal
    const out = Math.abs(res) < 1e-12 ? 0 : res;
    // remove trailing zeros and unnecessary decimal point
    const formatted = parseFloat(out.toFixed(8)).toString();
    
    // display just the result (like standard calculator)
    setAnswer(formatted);
    setDisplay(formatted);
  };

  const backspace = () => setDisplay(d => d.slice(0, -1));
  const toggleSign = () => {
    if (!display) return;
    if (display.startsWith('-')) setDisplay(display.slice(1));
    else setDisplay('-' + display);
  };

  const percent = () => {
    const val = parseFloat(display || '0');
    if (isNaN(val)) { setAnswer('Error'); return; }
    const out = val / 100;
    setAnswer(String(out)); setDisplay(String(out));
  };

  const reciprocal = () => {
    const val = parseFloat(display || '0');
    if (isNaN(val) || val === 0) { setAnswer('Error'); return; }
    const out = 1 / val;
    setAnswer(String(out)); setDisplay(String(out));
  };

  const sqrt = () => {
    const val = parseFloat(display || '0');
    if (isNaN(val) || val < 0) { setAnswer('Error'); return; }
    const out = Math.sqrt(val);
    setAnswer(String(out)); setDisplay(String(out));
  };

  return (
    <div className="app-center">
      <div className="card">
        <div className="calc-header">
          <div style={{width:20,height:20,background:'transparent'}} />
          <div className="calc-title">Standard</div>
        </div>

        <div className="calc-display">
          <div style={{flex:1}} />
          <div className="calc-value">{answer || display || '0'}</div>
        </div>

        <div className="calc-grid">
          {/* Row 1 */}
          <button className="btn btn-op" onClick={percent}>%</button>
          <button className="btn btn-op" onClick={() => { setDisplay(''); setAnswer(''); }}>CE</button>
          <button className="btn btn-op" onClick={clear}>C</button>
          <button className="btn btn-op" onClick={backspace}>⌫</button>

          {/* Row 2 */}
          <button className="btn btn-op" onClick={reciprocal}>1/x</button>
          <button className="btn btn-op" onClick={() => { const v = parseFloat(display||'0'); const out = v*v; setAnswer(String(out)); setDisplay(String(out)); }}>x²</button>
          <button className="btn btn-op" onClick={sqrt}>√x</button>
          <button className="btn btn-op" onClick={() => press('/')}>/</button>

          {/* Row 3 */}
          <button className="btn btn-num" onClick={() => press('7')}>7</button>
          <button className="btn btn-num" onClick={() => press('8')}>8</button>
          <button className="btn btn-num" onClick={() => press('9')}>9</button>
          <button className="btn btn-op" onClick={() => press('*')}>*</button>

          {/* Row 4 */}
          <button className="btn btn-num" onClick={() => press('4')}>4</button>
          <button className="btn btn-num" onClick={() => press('5')}>5</button>
          <button className="btn btn-num" onClick={() => press('6')}>6</button>
          <button className="btn btn-op" onClick={() => press('-')}>-</button>

          {/* Row 5 */}
          <button className="btn btn-num" onClick={() => press('1')}>1</button>
          <button className="btn btn-num" onClick={() => press('2')}>2</button>
          <button className="btn btn-num" onClick={() => press('3')}>3</button>
          <button className="btn btn-op" onClick={() => press('+')}>+</button>

          {/* Row 6 */}
          <button className="btn btn-op" onClick={toggleSign}>±</button>
          <button className="btn btn-num" onClick={() => press('0')}>0</button>
          <button className="btn btn-num" onClick={() => press('.')}>.</button>
          <button className="btn btn-eq" onClick={compute}>=</button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.45rem' }}>
          <button className="btn btn-accent" onClick={() => applyTrig('sin')}>sin</button>
          <button className="btn btn-accent" onClick={() => applyTrig('cos')}>cos</button>
          <button className="btn btn-accent" onClick={() => applyTrig('tan')}>tan</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;