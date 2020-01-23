import {
  getMeetingFrequency,
  getGetOrdinal,
  getMeetingDay,
  getMeetingTime,
} from '../groups';

describe('Group utilities', () => {
  test('get meeting frequency', async () => {
    expect(getMeetingFrequency(1, 'Weekly')).toBe('Every week');
    expect(getMeetingFrequency(1, 'Monthly')).toBe('Every month');
    expect(getMeetingFrequency(2, 'Weekly')).toBe('Every 2 weeks');
    expect(getMeetingFrequency(2, 'Monthly')).toBe('Every 2 months');
  });

  test('get ordinal value', () => {
    expect(getGetOrdinal(1)).toBe('1st');
    expect(getGetOrdinal(2)).toBe('2nd');
    expect(getGetOrdinal(3)).toBe('3rd');
    expect(getGetOrdinal(4)).toBe('4th');
  });

  test('get meeting day', () => {
    expect(getMeetingDay(['Friday'])).toBe('Friday');
    expect(getMeetingDay(['Monday', 'Friday'])).toBe('Monday, Friday');
    expect(
      getMeetingDay([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ])
    ).toBe('Every day');
  });

  test('get meeting time', () => {
    expect(getMeetingTime()).toBe(null);
    expect(getMeetingTime('19:00:00 PST')).toBe('7:00pm');
    expect(getMeetingTime('9:00:00 PST')).toBe('9:00am');
  });
});
