import * as moment from 'moment-timezone';

/** add time */
export const addMonthTime = (timezone: string, addNumber: number = 1) => {
  try {
    const setTimezone = moment().tz(timezone);
    const futureTime = setTimezone.add(addNumber, 'month');
    return futureTime;
  } catch (error) {
    console.log(error.message);
  }
};

export const addMonthsTime = (timezone: string, addNumber: number = 1) => {
  try {
    const setTimezone = moment().tz(timezone);
    const futureTime = setTimezone.add(addNumber, 'months');
    return futureTime.format();
  } catch (error) {
    console.log(error.message);
  }
};

export const addDayTime = (timezone: string, addNumber: number = 1) => {
  try {
    const setTimezone = moment().tz(timezone);
    const futureTime = setTimezone.clone().add(addNumber, 'days');
    return futureTime.format();
  } catch (error) {
    console.log(error.message);
  }
};

export const addDaysTime = (timezone: string, addNumber: number = 1) => {
  try {
    const setTimezone = moment().tz(timezone);
    const futureTime = setTimezone.clone().add(addNumber, 'days');
    return futureTime.format();
  } catch (error) {
    console.log(error.message);
  }
};

/** check time or end time */
export const isEnded = (time: string, timezone: string): boolean => {
  const Time = moment.tz(time, timezone);

  const currentTime = moment.tz(time);

  return Time.isBefore(currentTime);
};

/** over 4hour or within 4hour */
export const isOver4hr = (time: string, timezone: string) => {
  const momentTime = moment(time);

  const bangkokTime = momentTime.tz(timezone);

  const currentBangkokTime = moment().tz(timezone);

  const differenceInHours = bangkokTime.diff(currentBangkokTime, 'hours');

  return differenceInHours > 4;
};
