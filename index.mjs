import http from 'node:http';

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

const Intervals = [
  { from: 0, to: 7, icon: Icons.Red },
  { from: 7, to: 8, icon: Icons.Orange },
  { from: 8, to: 19, icon: Icons.Pink },
  { from: 19, to: 24, icon: Icons.Red },
];

const formatTime = (d) => {
  return `${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

const server = http.createServer((request, response) => {
  const now = new Date();

  const hour = now.getHours();

  const interval = Intervals.find((int) => {
    return int.from <= hour && hour < int.to;
  });

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
