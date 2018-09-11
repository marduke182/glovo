import { getDay, isThisDay, isThisTime } from '@/shared/libs/date-fns';

/**
 * Return true if store is open, false otherwise
 * @param store
 * @returns {*}
 */
const storeIsOpen = schedule => {
  const storeIsOpen = schedule.some(({ day, open, close }) => {
    return isThisDay(day) && isThisTime(open, close);
  });
  return storeIsOpen;
};

const DAYS_IN_WEEK = 7;

/**
 * Return next opening schedule
 * @param schedule
 * @returns {{ day, open, close}}
 */
export const getNextOpeningSchedule = schedule => {
  const today = getDay(new Date());
  const base = DAYS_IN_WEEK - today - 1;
  // Get the min diference in schedule
  const minDiff = schedule.reduce((minDiff, { day }) => {
    const diff = (base + day) % DAYS_IN_WEEK;
    return minDiff < diff ? minDiff : diff;
  }, DAYS_IN_WEEK - 1);

  // If min difference is days in week means there is no next schedule
  if (minDiff === DAYS_IN_WEEK - 1) {
    return null;
  }

  // Return day to his original number
  const nextScheduleDay = (today + minDiff + 1) % DAYS_IN_WEEK;

  // Find the respective schedule
  return schedule.find(({ day }) => day === nextScheduleDay);
};

/**
 * Map store object with extra values like store is open and next opening schedule
 */
export default store => {
  const nextOpeningSchedule = getNextOpeningSchedule(store.schedule);
  return {
    ...store,
    storeIsOpen: storeIsOpen(store.schedule),
    nextOpeningSchedule,
  }
};
