import { expect, test } from 'vitest';
import { findInterval } from '../find-interval.mjs';

const Intervals = [
  { from: '00:00', to: '06:30', icon: 'red' },
  { from: '06:30', to: '19:30', icon: 'pink' },
  { from: '19:30', to: '00:00', icon: 'green' },
];

test.each([
  [new Date('2023-08-25 00:00'), 0],
  [new Date('2023-08-25 06:30'), 1],
  [new Date('2023-08-25 06:29'), 0],
  [new Date('2023-08-25 19:29'), 1],
  [new Date('2023-08-25 19:30'), 2],
  [new Date('2023-08-25 19:31'), 2],
  [new Date('2023-08-25 23:59'), 2],
])('%s would get interval with index %d', (date, expectedIntervalIndex) => {
  const foundInterval = findInterval(date, Intervals);

  expect(foundInterval).toBe(Intervals[expectedIntervalIndex]);
});
