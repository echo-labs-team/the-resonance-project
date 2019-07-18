// @flow

export const getCampusCode = (campus: string = '') => {
  switch (campus) {
    case 'NORTH SAN JOSE':
      return 'NSJ';

    case 'SOUTH SAN JOSE':
      return 'SSJ';

    case 'SUNNYVALE':
      return 'SVL';

    case 'FREMONT':
      return 'FMT';

    default:
  }
};

export const getMeetingFrequency = (
  frequency: string = '',
  interval: string = ''
) => {
  if (interval.toLowerCase() === 'weekly') {
    if (frequency === '1') {
      return 'Every week';
    }

    return `Every ${frequency} weeks`;
  }

  if (interval.toLowerCase() === 'monthly') {
    if (frequency === '1') {
      return 'Every month';
    }

    return `Every ${frequency} months`;
  }
};

const getGetOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;

  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const getMeetingDay = (
  daysOfWeek: Array<string> = [],
  dayOfMonth: Array<string> | string = []
) => {
  if (daysOfWeek.length) {
    if (daysOfWeek.length === 7) {
      return 'Every day';
    }

    return daysOfWeek.join(', ');
  }

  if (dayOfMonth.length) {
    // TODO: make sure `dayOfMonth` is an array of days
    // make sure we have an array of days of the month
    const daysOfTheMonth = [...dayOfMonth].map(day =>
      getGetOrdinal(parseInt(day, 10))
    );

    return `the ${daysOfTheMonth.join(' & ')}`;
  }
};

export const getMeetingTime = (time: string = '') => {
  const [hours, minutes] = time
    .split('(')[0]
    .trim()
    .split(':');
  const hrs = parseInt(hours, 10);

  let h = hrs % 12;

  if (h === 0) {
    h = 12;
  }
  return `${h}:${minutes}${hrs < 12 ? 'am' : 'pm'}`;
};
