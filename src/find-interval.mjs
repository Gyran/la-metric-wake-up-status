export const findInterval = (now, intervals) => {
  const hour = now.getHours();
  const minute = now.getMinutes();

  return intervals.find((int) => {
    const fromParts = int.from.split(':');
    const toParts = int.to.split(':');

    const fromHours = parseInt(fromParts[0], 10);
    const fromMinutes = parseInt(fromParts[1], 10);
    const toHours = parseInt(toParts[0], 10);
    const toMinutes = parseInt(toParts[1], 10);

    // this will not work if from and to is same hour, but I simplify this now as
    // I don't have any interval like that
    if (hour === fromHours && hour === toHours) {
      throw new Error('Same from and to hour not supported');
    }

    if (hour === fromHours && hour < toHours) {
      return fromMinutes <= minute;
    }
    if (hour === toHours) {
      return minute < toMinutes;
    }

    if (toHours === 0) {
      return true;
    }

    return fromHours <= hour && hour < toHours;
  });
};
