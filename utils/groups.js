export const getMeetingFrequency = (frequency = 1, interval = '') => {
  if (interval.toLowerCase() === 'weekly') {
    if (Number(frequency) === 1) {
      return 'Every week';
    }

    return `Every ${frequency} weeks`;
  }

  if (interval.toLowerCase() === 'monthly') {
    if (Number(frequency) === 1) {
      return 'Every month';
    }

    return `Every ${frequency} months`;
  }
};

export const getGetOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;

  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const getMeetingDay = (daysOfWeek = [], dayOfMonth) => {
  if (daysOfWeek.length) {
    if (daysOfWeek.length === 7) {
      return 'Every day';
    }

    return daysOfWeek.join(', ');
  }

  if (dayOfMonth) {
    const day = getGetOrdinal(parseInt(dayOfMonth, 10));

    return `the ${day}`;
  }
};

export const getMeetingTime = (meetingTime) => {
  if (!meetingTime) {
    return null;
  }

  const [time] = meetingTime.split(' ');
  const [hours, minutes] = time.split(':');
  const hrs = parseInt(hours, 10);

  let h = hrs % 12;

  if (h === 0) {
    h = 12;
  }

  return `${h}:${minutes}${hrs < 12 ? 'am' : 'pm'}`;
};
