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
  if (!date1 || !date2) throw new Error('Missing date');

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  d1.setUTCMilliseconds(0);
  d1.setUTCSeconds(0);
  d1.setUTCMinutes(0);
  d1.setUTCHours(0);

  d2.setUTCMilliseconds(0);
  d2.setUTCSeconds(0);
  d2.setUTCMinutes(0);
  d2.setUTCHours(0);

  if (d1.getTime() > d2.getTime()) return false;

  return true;
}
