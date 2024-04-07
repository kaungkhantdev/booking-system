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

/** start time */

/** over 4hour or within 4hour */
