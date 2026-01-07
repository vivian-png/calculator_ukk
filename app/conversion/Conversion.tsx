// ...existing code...
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
      // Normalize to Celsius first, then convert to target
      let celsius: number;
      switch (fromUnit) {
        case 'celsius':
          celsius = value;
          break;
        case 'fahrenheit':
          celsius = ((value - 32) * 5) / 9;
          break;
        case 'kelvin':
          celsius = value - 273.15;
          break;
        case 'reamur':
          celsius = (value * 5) / 4;
          break;
        default:
          celsius = value;
      }

      switch (toUnit) {
        case 'celsius':
          convertedValue = celsius;
          break;
        case 'fahrenheit':
          convertedValue = (celsius * 9) / 5 + 32;
          break;
        case 'kelvin':
          convertedValue = celsius + 273.15;
          break;
        case 'reamur':
          convertedValue = (celsius * 4) / 5;
          break;
        default:
          convertedValue = celsius;
      }
    } else if (category === 'weight') {
      switch (fromUnit) {
        case 'kg':
          if (toUnit === 'g') convertedValue = value * 1000;
          else if (toUnit === 'mg') convertedValue = value * 1000000;
          else if (toUnit === 'lbs') convertedValue = value * 2.20462;
          else if (toUnit === 'oz') convertedValue = value * 35.274;
          else convertedValue = value;
          break;
        case 'g':
          if (toUnit === 'kg') convertedValue = value / 1000;
          else if (toUnit === 'mg') convertedValue = value * 1000;
          else if (toUnit === 'lbs') convertedValue = value / 453.592;
          else if (toUnit === 'oz') convertedValue = value / 28.3495;
          else convertedValue = value;
          break;
        case 'mg':
          if (toUnit === 'kg') convertedValue = value / 1000000;
          else if (toUnit === 'g') convertedValue = value / 1000;
          else if (toUnit === 'lbs') convertedValue = value / 453592;
          else if (toUnit === 'oz') convertedValue = value / 28349.5;
          else convertedValue = value;
          break;
        case 'lbs':
          if (toUnit === 'kg') convertedValue = value / 2.20462;
          else if (toUnit === 'g') convertedValue = value * 453.592;
          else if (toUnit === 'mg') convertedValue = value * 453592;
          else if (toUnit === 'oz') convertedValue = value * 16;
          else convertedValue = value;
          break;
        case 'oz':
          if (toUnit === 'kg') convertedValue = value / 35.274;
          else if (toUnit === 'g') convertedValue = value * 28.3495;
          else if (toUnit === 'mg') convertedValue = value * 28349.5;
          else if (toUnit === 'lbs') convertedValue = value / 16;
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
          else if (toUnit === 'inch') convertedValue = value * 39.3701;
          else if (toUnit === 'foot') convertedValue = value * 3.28084;
          else if (toUnit === 'yard') convertedValue = value * 1.09361;
          else convertedValue = value;
          break;
        case 'km':
          if (toUnit === 'm') convertedValue = value * 1000;
          else if (toUnit === 'cm') convertedValue = value * 100000;
          else if (toUnit === 'mm') convertedValue = value * 1000000;
          else if (toUnit === 'mile') convertedValue = value / 1.60934;
          else if (toUnit === 'inch') convertedValue = value * 39370.1;
          else if (toUnit === 'foot') convertedValue = value * 3280.84;
          else if (toUnit === 'yard') convertedValue = value * 1093.61;
          else convertedValue = value;
          break;
        case 'cm':
          if (toUnit === 'm') convertedValue = value / 100;
          else if (toUnit === 'km') convertedValue = value / 100000;
          else if (toUnit === 'mm') convertedValue = value * 10;
          else if (toUnit === 'mile') convertedValue = value / 160934;
          else if (toUnit === 'inch') convertedValue = value / 2.54;
          else if (toUnit === 'foot') convertedValue = value / 30.48;
          else if (toUnit === 'yard') convertedValue = value / 91.44;
          else convertedValue = value;
          break;
        case 'mm':
          if (toUnit === 'm') convertedValue = value / 1000;
          else if (toUnit === 'km') convertedValue = value / 1000000;
          else if (toUnit === 'cm') convertedValue = value / 10;
          else if (toUnit === 'mile') convertedValue = value / 1609340;
          else if (toUnit === 'inch') convertedValue = value / 25.4;
          else if (toUnit === 'foot') convertedValue = value / 304.8;
          else if (toUnit === 'yard') convertedValue = value / 914.4;
          else convertedValue = value;
          break;
        case 'mile':
          if (toUnit === 'm') convertedValue = value * 1609.34;
          else if (toUnit === 'km') convertedValue = value * 1.60934;
          else if (toUnit === 'cm') convertedValue = value * 160934;
          else if (toUnit === 'mm') convertedValue = value * 1609340;
          else if (toUnit === 'inch') convertedValue = value * 63360;
          else if (toUnit === 'foot') convertedValue = value * 5280;
          else if (toUnit === 'yard') convertedValue = value * 1760;
          else convertedValue = value;
          break;
        case 'inch':
          if (toUnit === 'm') convertedValue = value / 39.3701;
          else if (toUnit === 'km') convertedValue = value / 39370.1;
          else if (toUnit === 'cm') convertedValue = value * 2.54;
          else if (toUnit === 'mm') convertedValue = value * 25.4;
          else if (toUnit === 'mile') convertedValue = value / 63360;
          else if (toUnit === 'foot') convertedValue = value / 12;
          else if (toUnit === 'yard') convertedValue = value / 36;
          else convertedValue = value;
          break;
        case 'foot':
          if (toUnit === 'm') convertedValue = value / 3.28084;
          else if (toUnit === 'km') convertedValue = value / 3280.84;
          else if (toUnit === 'cm') convertedValue = value * 30.48;
          else if (toUnit === 'mm') convertedValue = value * 304.8;
          else if (toUnit === 'mile') convertedValue = value / 5280;
          else if (toUnit === 'inch') convertedValue = value * 12;
          else if (toUnit === 'yard') convertedValue = value / 3;
          else convertedValue = value;
          break;
        case 'yard':
          if (toUnit === 'm') convertedValue = value / 1.09361;
          else if (toUnit === 'km') convertedValue = value / 1093.61;
          else if (toUnit === 'cm') convertedValue = value * 91.44;
          else if (toUnit === 'mm') convertedValue = value * 914.4;
          else if (toUnit === 'mile') convertedValue = value / 1760;
          else if (toUnit === 'inch') convertedValue = value * 36;
          else if (toUnit === 'foot') convertedValue = value * 3;
          else convertedValue = value;
          break;
        default:
          convertedValue = value;
      }
    } else if (category === 'volume') {
      switch (fromUnit) {
        case 'l':
          if (toUnit === 'ml') convertedValue = value * 1000;
          else if (toUnit === 'cm3') convertedValue = value * 1000;
          else if (toUnit === 'm3') convertedValue = value / 1000;
          else if (toUnit === 'cl') convertedValue = value * 100;
          else if (toUnit === 'dl') convertedValue = value * 10;
          else if (toUnit === 'gallon') convertedValue = value / 3.78541;
          else if (toUnit === 'pint') convertedValue = value * 2.11338;
          else if (toUnit === 'quart') convertedValue = value * 1.05669;
          else if (toUnit === 'cup') convertedValue = value * 4.22675;
          else if (toUnit === 'fl_oz') convertedValue = value * 33.814;
          else convertedValue = value;
          break;
        case 'ml':
          if (toUnit === 'l') convertedValue = value / 1000;
          else if (toUnit === 'cm3') convertedValue = value;
          else if (toUnit === 'm3') convertedValue = value / 1000000;
          else if (toUnit === 'cl') convertedValue = value / 10;
          else if (toUnit === 'dl') convertedValue = value / 100;
          else if (toUnit === 'gallon') convertedValue = value / 3785.41;
          else if (toUnit === 'pint') convertedValue = value / 473.176;
          else if (toUnit === 'quart') convertedValue = value / 946.353;
          else if (toUnit === 'cup') convertedValue = value / 236.588;
          else if (toUnit === 'fl_oz') convertedValue = value / 29.5735;
          else convertedValue = value;
          break;
        case 'cm3':
          if (toUnit === 'l') convertedValue = value / 1000;
          else if (toUnit === 'ml') convertedValue = value;
          else if (toUnit === 'm3') convertedValue = value / 1000000;
          else if (toUnit === 'cl') convertedValue = value / 10;
          else if (toUnit === 'dl') convertedValue = value / 100;
          else if (toUnit === 'gallon') convertedValue = value / 3785.41;
          else if (toUnit === 'pint') convertedValue = value / 473.176;
          else if (toUnit === 'quart') convertedValue = value / 946.353;
          else if (toUnit === 'cup') convertedValue = value / 236.588;
          else if (toUnit === 'fl_oz') convertedValue = value / 29.5735;
          else convertedValue = value;
          break;
        case 'm3':
          if (toUnit === 'l') convertedValue = value * 1000;
          else if (toUnit === 'ml') convertedValue = value * 1000000;
          else if (toUnit === 'cm3') convertedValue = value * 1000000;
          else if (toUnit === 'cl') convertedValue = value * 100000;
          else if (toUnit === 'dl') convertedValue = value * 10000;
          else if (toUnit === 'gallon') convertedValue = value * 264.172;
          else if (toUnit === 'pint') convertedValue = value * 2113.38;
          else if (toUnit === 'quart') convertedValue = value * 1056.69;
          else if (toUnit === 'cup') convertedValue = value * 4226.75;
          else if (toUnit === 'fl_oz') convertedValue = value * 33814;
          else convertedValue = value;
          break;
        case 'cl':
          if (toUnit === 'l') convertedValue = value / 100;
          else if (toUnit === 'ml') convertedValue = value * 10;
          else if (toUnit === 'cm3') convertedValue = value * 10;
          else if (toUnit === 'm3') convertedValue = value / 100000;
          else if (toUnit === 'dl') convertedValue = value / 10;
          else if (toUnit === 'gallon') convertedValue = value / 378.541;
          else if (toUnit === 'pint') convertedValue = value / 47.3176;
          else if (toUnit === 'quart') convertedValue = value / 94.6353;
          else if (toUnit === 'cup') convertedValue = value / 23.6588;
          else if (toUnit === 'fl_oz') convertedValue = value / 2.95735;
          else convertedValue = value;
          break;
        case 'dl':
          if (toUnit === 'l') convertedValue = value / 10;
          else if (toUnit === 'ml') convertedValue = value * 100;
          else if (toUnit === 'cm3') convertedValue = value * 100;
          else if (toUnit === 'm3') convertedValue = value / 10000;
          else if (toUnit === 'cl') convertedValue = value * 10;
          else if (toUnit === 'gallon') convertedValue = value / 37.8541;
          else if (toUnit === 'pint') convertedValue = value / 4.73176;
          else if (toUnit === 'quart') convertedValue = value / 9.46353;
          else if (toUnit === 'cup') convertedValue = value / 2.36588;
          else if (toUnit === 'fl_oz') convertedValue = value / 0.295735;
          else convertedValue = value;
          break;
        case 'gallon':
          if (toUnit === 'l') convertedValue = value * 3.78541;
          else if (toUnit === 'ml') convertedValue = value * 3785.41;
          else if (toUnit === 'cm3') convertedValue = value * 3785.41;
          else if (toUnit === 'm3') convertedValue = value / 264.172;
          else if (toUnit === 'cl') convertedValue = value * 378.541;
          else if (toUnit === 'dl') convertedValue = value * 37.8541;
          else if (toUnit === 'pint') convertedValue = value * 8;
          else if (toUnit === 'quart') convertedValue = value * 4;
          else if (toUnit === 'cup') convertedValue = value * 16;
          else if (toUnit === 'fl_oz') convertedValue = value * 128;
          else convertedValue = value;
          break;
        case 'pint':
          if (toUnit === 'l') convertedValue = value / 2.11338;
          else if (toUnit === 'ml') convertedValue = value * 473.176;
          else if (toUnit === 'cm3') convertedValue = value * 473.176;
          else if (toUnit === 'm3') convertedValue = value / 2113.38;
          else if (toUnit === 'cl') convertedValue = value * 47.3176;
          else if (toUnit === 'dl') convertedValue = value * 4.73176;
          else if (toUnit === 'gallon') convertedValue = value / 8;
          else if (toUnit === 'quart') convertedValue = value / 2;
          else if (toUnit === 'cup') convertedValue = value * 2;
          else if (toUnit === 'fl_oz') convertedValue = value * 16;
          else convertedValue = value;
          break;
        case 'quart':
          if (toUnit === 'l') convertedValue = value / 1.05669;
          else if (toUnit === 'ml') convertedValue = value * 946.353;
          else if (toUnit === 'cm3') convertedValue = value * 946.353;
          else if (toUnit === 'm3') convertedValue = value / 1056.69;
          else if (toUnit === 'cl') convertedValue = value * 94.6353;
          else if (toUnit === 'dl') convertedValue = value * 9.46353;
          else if (toUnit === 'gallon') convertedValue = value / 4;
          else if (toUnit === 'pint') convertedValue = value * 2;
          else if (toUnit === 'cup') convertedValue = value * 4;
          else if (toUnit === 'fl_oz') convertedValue = value * 32;
          else convertedValue = value;
          break;
        case 'cup':
          if (toUnit === 'l') convertedValue = value / 4.22675;
          else if (toUnit === 'ml') convertedValue = value * 236.588;
          else if (toUnit === 'cm3') convertedValue = value * 236.588;
          else if (toUnit === 'm3') convertedValue = value / 4226.75;
          else if (toUnit === 'cl') convertedValue = value * 23.6588;
          else if (toUnit === 'dl') convertedValue = value * 2.36588;
          else if (toUnit === 'gallon') convertedValue = value / 16;
          else if (toUnit === 'pint') convertedValue = value / 2;
          else if (toUnit === 'quart') convertedValue = value / 4;
          else if (toUnit === 'fl_oz') convertedValue = value * 8;
          else convertedValue = value;
          break;
        case 'fl_oz':
          if (toUnit === 'l') convertedValue = value / 33.814;
          else if (toUnit === 'ml') convertedValue = value * 29.5735;
          else if (toUnit === 'cm3') convertedValue = value * 29.5735;
          else if (toUnit === 'm3') convertedValue = value / 33814;
          else if (toUnit === 'cl') convertedValue = value * 2.95735;
          else if (toUnit === 'dl') convertedValue = value / 0.295735;
          else if (toUnit === 'gallon') convertedValue = value / 128;
          else if (toUnit === 'pint') convertedValue = value / 16;
          else if (toUnit === 'quart') convertedValue = value / 32;
          else if (toUnit === 'cup') convertedValue = value / 8;
          else convertedValue = value;
          break;
        default:
          convertedValue = value;
      }
    } else if (category === 'currency') {
      // Simple currency conversion (using example rates)
      const rates: Record<string, Record<string, number>> = {
        usd: { usd: 1, eur: 0.92, gbp: 0.79, jpy: 149.5, idr: 16000, cny: 7.2, aud: 1.5, cad: 1.35, chf: 0.92, sgd: 1.35, krw: 1310 },
        eur: { usd: 1.09, eur: 1, gbp: 0.86, jpy: 162.8, idr: 17400, cny: 7.85, aud: 1.63, cad: 1.47, chf: 1.0, sgd: 1.46, krw: 1425 },
        gbp: { usd: 1.27, eur: 1.16, gbp: 1, jpy: 189.4, idr: 20200, cny: 9.15, aud: 1.9, cad: 1.71, chf: 1.28, sgd: 1.72, krw: 1660 },
        jpy: { usd: 0.0067, eur: 0.0061, gbp: 0.0053, jpy: 1, idr: 107, cny: 0.048, aud: 0.010, cad: 0.009, chf: 0.0061, sgd: 0.009, krw: 9.0 },
        idr: { usd: 0.000063, eur: 0.000058, gbp: 0.000050, jpy: 0.0093, idr: 1, cny: 0.00045, aud: 0.000094, cad: 0.000084, chf: 0.000058, sgd: 0.000084, krw: 0.081 },
        cny: { usd: 0.139, eur: 0.127, gbp: 0.11, jpy: 20.9, idr: 2222, cny: 1, aud: 0.21, cad: 0.19, chf: 0.13, sgd: 0.19, krw: 185 },
        aud: { usd: 0.67, eur: 0.61, gbp: 0.53, jpy: 110, idr: 10667, cny: 4.8, aud: 1, cad: 0.9, chf: 0.61, sgd: 0.9, krw: 880 },
        cad: { usd: 0.74, eur: 0.68, gbp: 0.58, jpy: 122, idr: 11852, cny: 5.2, aud: 1.12, cad: 1, chf: 0.68, sgd: 0.95, krw: 970 },
        chf: { usd: 1.09, eur: 1.0, gbp: 0.78, jpy: 164, idr: 17400, cny: 7.75, aud: 1.64, cad: 1.48, chf: 1, sgd: 1.47, krw: 1410 },
        sgd: { usd: 0.74, eur: 0.68, gbp: 0.58, jpy: 122, idr: 11852, cny: 5.2, aud: 1.11, cad: 1.05, chf: 0.68, sgd: 1, krw: 980 },
        krw: { usd: 0.00076, eur: 0.00070, gbp: 0.00060, jpy: 0.11, idr: 12.3, cny: 0.0054, aud: 0.0011, cad: 0.00103, chf: 0.00071, sgd: 0.00102, krw: 1 }
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
        return ['celsius', 'fahrenheit', 'kelvin', 'reamur'];
      case 'weight':
        return ['kg', 'g', 'mg', 'lbs', 'oz'];
      case 'length':
        return ['m', 'km', 'cm', 'mm', 'mile', 'inch', 'foot', 'yard'];
      case 'volume':
        return ['l', 'ml', 'cm3', 'm3', 'cl', 'dl', 'gallon', 'pint', 'quart', 'cup', 'fl_oz'];
      case 'currency':
        return ['usd', 'eur', 'gbp', 'jpy', 'idr', 'cny', 'aud', 'cad', 'chf', 'sgd', 'krw'];
      default:
        return [];
    }
  };

  const getUnitLabel = (unit: string): string => {
    const labels: Record<string, string> = {
      celsius: 'Celsius',
      fahrenheit: 'Fahrenheit',
      kelvin: 'Kelvin',
      reamur: 'Reamur',
      kg: 'Kilogram',
      g: 'Gram',
      mg: 'Milligram',
      lbs: 'Pounds',
      oz: 'Ounce',
      m: 'Meter',
      km: 'Kilometer',
      cm: 'Centimeter',
      mm: 'Millimeter',
      mile: 'Mile',
      inch: 'Inch',
      foot: 'Foot',
      yard: 'Yard',
      l: 'Liter',
      ml: 'Milliliter',
      cm3: 'Cubic Centimeter',
      m3: 'Cubic Meter',
      cl: 'Centiliter',
      dl: 'Deciliter',
      gallon: 'Gallon',
      pint: 'Pint',
      quart: 'Quart',
      cup: 'Cup',
      fl_oz: 'Fluid Ounce',
      usd: 'US Dollar',
      eur: 'Euro',
      gbp: 'British Pound',
      jpy: 'Japanese Yen',
      idr: 'Indonesian Rupiah',
      cny: 'Chinese Yuan',
      aud: 'Australian Dollar',
      cad: 'Canadian Dollar',
      chf: 'Swiss Franc',
      sgd: 'Singapore Dollar',
      krw: 'South Korean Won',
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
// ...existing code...