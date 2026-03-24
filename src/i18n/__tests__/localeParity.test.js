import { describe, it, expect } from 'vitest';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import eo from '../locales/eo.json';

const getLeafPaths = (obj, prefix = '') => {
  return Object.entries(obj).flatMap(([key, value]) => {
    const nextPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return getLeafPaths(value, nextPath);
    }
    return [nextPath];
  });
};

describe('Locale parity', () => {
  it('keeps es, fr, and eo key coverage aligned with en', () => {
    const base = getLeafPaths(en).sort();
    const targets = {
      es: getLeafPaths(es).sort(),
      fr: getLeafPaths(fr).sort(),
      eo: getLeafPaths(eo).sort(),
    };

    for (const [locale, keys] of Object.entries(targets)) {
      expect(keys, `${locale} keys mismatch`).toEqual(base);
    }
  });
});
