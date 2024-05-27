/**
 * @description Validates if a date is smaller or equal than another
 * @param date1 Date | string
 * @param date2 Date | string
 * @returns boolean
 */
export function dateSmallerOrEqualThanOther(
  date1: Date | string | null | undefined,
  date2: Date | string | null | undefined
): boolean {
  if (date1 == undefined || date1 == null || date2 == undefined || date2 == null) return false;

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (
    d1.getUTCFullYear() <= d2.getUTCFullYear() &&
    d1.getUTCMonth() <= d2.getUTCMonth() &&
    d1.getUTCDate() <= d2.getUTCDate()
  )
    return true;

  return false;
}
