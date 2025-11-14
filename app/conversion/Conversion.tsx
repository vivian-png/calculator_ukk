"use client";
import { useState } from 'react';

type Category = 'temperature' | 'weight' | 'length' | 'volume' | 'currency';

const Conversion = () => {
  const [category, setCategory] = useState<Category>('temperature');
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('celsius');
  const [toUnit, setToUnit] = useState<string>('fahrenheit');
  const [result, setResult] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult(null);
      return;
    }

    let convertedValue: number;

    if (category === 'temperature') {
      switch (fromUnit) {
        case 'celsius':
          if (toUnit === 'fahrenheit') convertedValue = (value * 9) / 5 + 32;
          else if (toUnit === 'kelvin') convertedValue = value + 273.15;
          else convertedValue = value;
          break;
        case 'fahrenheit':
          if (toUnit === 'celsius') convertedValue = ((value - 32) * 5) / 9;
          else if (toUnit === 'kelvin') convertedValue = ((value - 32) * 5) / 9 + 273.15;
          else convertedValue = value;
          break;
        case 'kelvin':
          if (toUnit === 'celsius') convertedValue = value - 273.15;
          else if (toUnit === 'fahrenheit') convertedValue = (value - 273.15) * 9 / 5 + 32;
          else convertedValue = value;
          break;
        default:
          convertedValue = value;
      }
    } else if (category === 'weight') {
      switch (fromUnit) {
        case 'kg':
          if (toUnit === 'g') convertedValue = value * 1000;
          else if (toUnit === 'lbs') convertedValue = value * 2.20462;
          else convertedValue = value;
          break;
        case 'g':
          if (toUnit === 'kg') convertedValue = value / 1000;
          else if (toUnit === 'lbs') convertedValue = value / 453.592;
          else convertedValue = value;
          break;
        case 'lbs':
          if (toUnit === 'kg') convertedValue = value / 2.20462;
          else if (toUnit === 'g') convertedValue = value * 453.592;
          else convertedValue = value;
          break;
        default:
          convertedValue = value;
      }
    } else if (category === 'length') {
      switch (fromUnit) {
        case 'm':
          if (toUnit === 'km') convertedValue = value / 1000;
          else if (toUnit === 'cm') convertedValue = value * 100;
          else if (toUnit === 'mm') convertedValue = value * 1000;
          else if (toUnit === 'mile') convertedValue = value / 1609.34;
          else convertedValue = value;
          break;
        case 'km':
          if (toUnit === 'm') convertedValue = value * 1000;
          else if (toUnit === 'cm') convertedValue = value * 100000;
          else if (toUnit === 'mm') convertedValue = value * 1000000;
          else if (toUnit === 'mile') convertedValue = value / 1.60934;
          else convertedValue = value;
          break;
        case 'cm':
          if (toUnit === 'm') convertedValue = value / 100;
          else if (toUnit === 'km') convertedValue = value / 100000;
          else if (toUnit === 'mm') convertedValue = value * 10;
          else if (toUnit === 'mile') convertedValue = value / 160934;
          else convertedValue = value;
          break;
        case 'mm':
          if (toUnit === 'm') convertedValue = value / 1000;
          else if (toUnit === 'km') convertedValue = value / 1000000;
          else if (toUnit === 'cm') convertedValue = value / 10;
          else if (toUnit === 'mile') convertedValue = value / 1609340;
          else convertedValue = value;
          break;
        case 'mile':
          if (toUnit === 'm') convertedValue = value * 1609.34;
          else if (toUnit === 'km') convertedValue = value * 1.60934;
          else if (toUnit === 'cm') convertedValue = value * 160934;
          else if (toUnit === 'mm') convertedValue = value * 1609340;
          else convertedValue = value;
          break;
        default:
          convertedValue = value;
      }
    } else if (category === 'volume') {
      switch (fromUnit) {
        case 'l':
          if (toUnit === 'ml') convertedValue = value * 1000;
          else if (toUnit === 'gallon') convertedValue = value / 3.78541;
          else convertedValue = value;
          break;
        case 'ml':
          if (toUnit === 'l') convertedValue = value / 1000;
          else if (toUnit === 'gallon') convertedValue = value / 3785.41;
          else convertedValue = value;
          break;
        case 'gallon':
          if (toUnit === 'l') convertedValue = value * 3.78541;
          else if (toUnit === 'ml') convertedValue = value * 3785.41;
          else convertedValue = value;
          break;
        default:
          convertedValue = value;
      }
    } else if (category === 'currency') {
      // Simple currency conversion (using example rates)
      const rates: Record<string, Record<string, number>> = {
        'usd': { 'usd': 1, 'eur': 0.92, 'gbp': 0.79, 'jpy': 149.50, 'idr': 16000 },
        'eur': { 'usd': 1.09, 'eur': 1, 'gbp': 0.86, 'jpy': 162.80, 'idr': 17400 },
        'gbp': { 'usd': 1.27, 'eur': 1.16, 'gbp': 1, 'jpy': 189.40, 'idr': 20200 },
        'jpy': { 'usd': 0.0067, 'eur': 0.0061, 'gbp': 0.0053, 'jpy': 1, 'idr': 107 },
        'idr': { 'usd': 0.000063, 'eur': 0.000058, 'gbp': 0.000050, 'jpy': 0.0093, 'idr': 1 },
      };
      convertedValue = value * (rates[fromUnit]?.[toUnit] || 1);
    } else {
      convertedValue = value;
    }

    setResult(convertedValue);
  };

  const format = (n: number) => {
    if (Math.abs(n) < 0.01) return n.toPrecision(2);
    return Number.isInteger(n) ? n.toString() : n.toFixed(2);
  };

  // Update from/to units when category changes
  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const unitsByCategory: Record<Category, [string, string]> = {
      temperature: ['celsius', 'fahrenheit'],
      weight: ['kg', 'g'],
      length: ['m', 'km'],
      volume: ['l', 'ml'],
      currency: ['usd', 'eur'],
    };
    const [from, to] = unitsByCategory[cat];
    setFromUnit(from);
    setToUnit(to);
    setResult(null);
  };

  const getUnitOptions = (): string[] => {
    switch (category) {
      case 'temperature':
        return ['celsius', 'fahrenheit', 'kelvin'];
      case 'weight':
        return ['kg', 'g', 'lbs'];
      case 'length':
        return ['m', 'km', 'cm', 'mm', 'mile'];
      case 'volume':
        return ['l', 'ml', 'gallon'];
      case 'currency':
        return ['usd', 'eur', 'gbp', 'jpy', 'idr'];
      default:
        return [];
    }
  };

  const getUnitLabel = (unit: string): string => {
    const labels: Record<string, string> = {
      celsius: 'Celsius',
      fahrenheit: 'Fahrenheit',
      kelvin: 'Kelvin',
      kg: 'Kilogram',
      g: 'Gram',
      lbs: 'Pounds',
      m: 'Meter',
      km: 'Kilometer',
      cm: 'Centimeter',
      mm: 'Millimeter',
      mile: 'Mile',
      l: 'Liter',
      ml: 'Milliliter',
      gallon: 'Gallon',
      usd: 'US Dollar',
      eur: 'Euro',
      gbp: 'British Pound',
      jpy: 'Japanese Yen',
      idr: 'Indonesian Rupiah',
    };
    return labels[unit] || unit;
  };

  const categories: Array<{ key: Category; label: string; icon: string }> = [
    { key: 'temperature', label: 'Temperature', icon: '🌡️' },
    { key: 'weight', label: 'Weight', icon: '⚖️' },
    { key: 'length', label: 'Length', icon: '📏' },
    { key: 'volume', label: 'Volume', icon: '🥤' },
    { key: 'currency', label: 'Currency', icon: '💱' },
  ];

  return (
    <div className="conversion-container">
      {/* Header with Hamburger Menu */}
      <div className="conv-header-bar">
        <button
          className="conv-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1 className="conv-app-title">Converter</h1>
      </div>

      {/* Sidebar */}
      <div className={`conversion-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="conversion-title">Select Unit</div>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`conversion-menu-item ${category === cat.key ? 'active' : ''}`}
            onClick={() => {
              handleCategoryChange(cat.key);
              setSidebarOpen(false);
            }}
          >
            <span className="conversion-icon">{cat.icon}</span>
            <span className="conversion-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="conversion-main">
        <div className="card">
          <div className="conv-header">
            <h2>{categories.find(c => c.key === category)?.label || 'Converter'}</h2>
          </div>

          <div className="conv-input-group">
            <input
              className="input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>

          <div className="conv-selects">
            <div className="conv-select-group">
              <label>From:</label>
              <select className="select" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                {getUnitOptions().map((unit) => (
                  <option key={unit} value={unit}>
                    {getUnitLabel(unit)}
                  </option>
                ))}
              </select>
            </div>

            <div className="conv-select-group">
              <label>To:</label>
              <select className="select" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                {getUnitOptions().map((unit) => (
                  <option key={unit} value={unit}>
                    {getUnitLabel(unit)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="conv-button-group">
            <button className="btn" onClick={convert}>Convert</button>
          </div>

          {result !== null && (
            <div className="conv-result">
              <div className="conv-result-value">{format(result)}</div>
              <div className="conv-result-unit">{getUnitLabel(toUnit)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversion;