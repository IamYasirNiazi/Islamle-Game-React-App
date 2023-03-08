import moment from 'moment';

export const getCurrentWord = () => {
  try {
    const currentDate = moment.utc();
    const pastDate = moment.utc('2023-03-05T12:00:00Z');
    const diffDays = currentDate.diff(pastDate, 'days');
    return diffDays;
  } catch (error) {
    console.error(error);
  }
};
