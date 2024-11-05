import { format } from 'date-fns';

export const getFormatDate = (d: Date): string => {
  const date = new Date(d);
  const yyyy = date.getFullYear();
  const mm = date.getMonth();
  const dd = date.getDate();

  return `${dd} ${months[mm]}, ${yyyy}`;
};

export const datePickerFormat = (date: Date, dateFormat: string): string => {
  return format(new Date(date), dateFormat);
};

export const isDateToday = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);

  if (!day || !month || !year) return false;

  const inputDate = new Date(year, month - 1, day);
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
};

const months: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
