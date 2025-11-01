import { formatIDR } from '../currency';

describe('formatIDR', () => {
  it('formats Indonesian Rupiah correctly', () => {
    expect(formatIDR(1000000)).toBe('Rp 1.000.000');
  });

  it('handles zero value', () => {
    expect(formatIDR(0)).toBe('Rp 0');
  });

  it('handles large numbers', () => {
    expect(formatIDR(1234567890)).toBe('Rp 1.234.567.890');
  });

  it('handles small numbers', () => {
    expect(formatIDR(500)).toBe('Rp 500');
  });

  it('does not show decimal places', () => {
    expect(formatIDR(1000.99)).toBe('Rp 1.000');
  });
});
