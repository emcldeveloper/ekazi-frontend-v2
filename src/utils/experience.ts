import moment from "moment";

interface DateRange {
  start_date: string;
  end_date?: string | null;
}

/* Sort newest first. Items with no end_date count as "Present". */
export const sortByMostRecent = <T extends DateRange>(items: T[] = []): T[] => {
  const getDate = (item: T) =>
    item.end_date ? new Date(item.end_date).getTime() : Date.now();

  return [...items].sort((a, b) => getDate(b) - getDate(a));
};

/* Total duration across items, e.g. "3 yrs - 4 mos". */
export const calculateDuration = (items: DateRange[] = []) => {
  const totalMonths = Math.round(
    items.reduce((sum, item) => {
      const start = moment(item.start_date);
      const end = item.end_date ? moment(item.end_date) : moment();
      return sum + end.diff(start, "months", true);
    }, 0),
  );

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months, text: `${years} yrs - ${months} mos` };
};

/* Group items by a key, keeping the original order of the items. */
export const groupBy = <T>(
  items: T[] = [],
  getKey: (item: T) => string | number,
) => {
  const groups = new Map<string, T[]>();

  items.forEach((item) => {
    const key = String(getKey(item));
    groups.set(key, [...(groups.get(key) ?? []), item]);
  });

  return Array.from(groups.entries());
};

/* Format a date range, e.g. "Jan 2020 - Present". */
export const formatDateRange = (start: string, end?: string | null) =>
  `${moment(start).format("MMM YYYY")} - ${end ? moment(end).format("MMM YYYY") : "Present"}`;
