import { getDay } from '../../../shared/libs/date-fns';
import { getNextOpeningSchedule } from '../mapStore';

jest.mock('../../../shared/libs/date-fns');

describe('getNextOpeningSchedul', () => {
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const THURSDAY = 3;
  const MONDAY = 0;
  const SUNDAY = 6;

  const wednesdaySchedule = { day: WEDNESDAY };
  const thursdaySchedule = { day: THURSDAY };
  const sundaySchedule = { day: SUNDAY };
  const mondaySchedule = { day: MONDAY };

  test('should return null', async () => {
    expect(getNextOpeningSchedule([])).toBeNull();
  });

  test('should return wednesday', async () => {
    getDay.mockReturnValueOnce(TUESDAY);

    expect(getNextOpeningSchedule([wednesdaySchedule])).toBe(wednesdaySchedule);
  });

  test('should return NULL, if is today the only one', async () => {
    getDay.mockReturnValueOnce(WEDNESDAY);

    expect(getNextOpeningSchedule([wednesdaySchedule])).toBeNull();
  });

  test('should return monday', async () => {
    getDay.mockReturnValueOnce(SUNDAY);

    expect(getNextOpeningSchedule([sundaySchedule, mondaySchedule])).toBe(mondaySchedule);
  });

  test('should return wednesday, if is sunday and there is only thursday a wednesday', async () => {
    getDay.mockReturnValueOnce(SUNDAY);

    expect(getNextOpeningSchedule([sundaySchedule, wednesdaySchedule, thursdaySchedule])).toBe(wednesdaySchedule);
  });
});

