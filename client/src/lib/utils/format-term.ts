export function formatTerm(months: number): string {
  if (months >= 12) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "Year" : "Years"}`;
    }
    return `${years} ${years === 1 ? "Year" : "Years"} ${remainingMonths} ${remainingMonths === 1 ? "Month" : "Months"}`;
  }
  return `${months} ${months === 1 ? "Month" : "Months"}`;
}
