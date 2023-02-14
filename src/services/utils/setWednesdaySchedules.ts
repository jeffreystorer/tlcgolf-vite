import { get, set } from '@/utils/localStorage';

export default function setWednesdaySchedules(values: Array<Array<string>>) {
  let i;
  let schedules: Array<string> = [];
  for (i = 1; i < values.length; i++) {
    if (values[i][3] === 'Y' || values[i][3] === 'C') {
      schedules.push(values[i][0]);
    }
  }

  set('wednesdaySchedules', schedules);
}
