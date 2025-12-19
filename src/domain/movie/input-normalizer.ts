/**
 * Normalizes raw user input to a canonical form
 *
 * This function ensures consistent matching regardless of:
 * - casing
 * - extra spaces
 * - leading/trailing whitespace
 */
export function normalizeTitle(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, ' ');
}
