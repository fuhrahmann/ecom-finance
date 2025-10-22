/**
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

/**
 * Format number as IDR with thousands separator
 * @param amount - Amount to format
 * @returns Formatted string (e.g., "150.000")
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}
