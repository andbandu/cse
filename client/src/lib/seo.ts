
/**
 * SEO utility functions for the application
 */

/**
 * Set page title with consistent branding
 * @param title Page specific title
 * @returns Full formatted page title
 */
export function setPageTitle(title: string): string {
  const baseTitle = "Colombo Stock Exchange Dividend";
  return `${title} | ${baseTitle} | CSE Dividend History`;
}

/**
 * Generate meta description based on content
 * @param content Content-specific description
 * @returns Formatted meta description
 */
export function getMetaDescription(content: string): string {
  return `${content} - Track and analyze dividend history of Colombo Stock Exchange (CSE).`;
}
