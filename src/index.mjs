import http from 'node:http';
import { findInterval } from './find-interval.mjs';

const Port = 3000;

const Icons = {
  Green: 1031,
  Red: 925,
  Orange: 842,
  White: 909,
  Black: 1358,
  Yellow: 1536,
  Pink: 42094,
};

const SchoolDayIntervals = [
  { from: '00:00', to: '06:30', icon: Icons.Red },
  { from: '06:30', to: '19:30', icon: Icons.Pink },
  { from: '19:00', to: '23:59', icon: Icons.Red },
];
const WeekendIntervals = [
  { from: '00:00', to: '07:00', icon: Icons.Red },
  { from: '07:00', to: '08:00', icon: Icons.Orange },
  { from: '08:00', to: '19:00', icon: Icons.Pink },
  { from: '19:00', to: '23:59', icon: Icons.Red },
];

const Intervals = {
  0: WeekendIntervals,
  1: SchoolDayIntervals,
  2: SchoolDayIntervals,
  3: SchoolDayIntervals,
  4: SchoolDayIntervals,
  5: SchoolDayIntervals,
  6: WeekendIntervals,
};

const formatTime = (d) => {
  return `${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

const server = http.createServer((request, response) => {
  const now = new Date();
  const day = now.getDay();
  const intervals = Intervals[day];

  const interval = findInterval(now, intervals);

  response.end(
    JSON.stringify({
      frames: [
        {
          text: formatTime(now),
          icon: interval.icon,
        },
      ],
    }),
  );
});

server.listen(Port);
