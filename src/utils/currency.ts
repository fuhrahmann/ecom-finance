/**
 * Format number as US Dollar (USD)
 * @param amount - Amount to format
 * @returns Formatted USD string (e.g., "$1,234.56")
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number with thousands separator
 * @param amount - Amount to format
 * @returns Formatted string (e.g., "1,234.56")
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount);
}

/**
 * @deprecated Use formatUSD instead
 * Format number as Indonesian Rupiah (IDR)
 * @param amount - Amount to format
 * @returns Formatted IDR string (e.g., "Rp 150.000")
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
