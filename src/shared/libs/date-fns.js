export const getDay = (date) => {
  const day = (date.getDay() - 1);
  return day < 0 ? 6 : day; // Javascript day start on sunday increase one day
};

// Monday is 0
export const isThisDay = (dateOfWeek) => {
  const day = getDay(new Date());
  return dateOfWeek === day;
};

function createTodayHourDate(stringHour) {
  const [hourString, minuteString] = stringHour.split(':');
  const date = new Date();
  date.setHours(Number.parseInt(hourString, 10), Number.parseInt(minuteString, 10), 0);
  return date;
}

export const isThisTime = (open, close) => {
  const openHour = createTodayHourDate(open);
  const closeHour = createTodayHourDate(close);

  const now = Date.now();
  return now > openHour.getTime() && now < closeHour.getTime();
};
