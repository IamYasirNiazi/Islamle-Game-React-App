import moment from 'moment';

export function updateNextWordTimestamp() {
  const now = moment.utc();
  const nextWordTime = moment.utc().set({ hour: 12, minute: 0, second: 0, millisecond: 0 });

  // If it's already past 12pm UTC today, set the next word for tomorrow
  if (now.isAfter(nextWordTime)) {
    nextWordTime.add(1, 'day');
  }

  localStorage.setItem('nextWordTimestamp', nextWordTime.valueOf() / 1000);
}
