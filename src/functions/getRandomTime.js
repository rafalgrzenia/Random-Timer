export function getRandomTime(min, max) {
  const minValue = min * 60000;
  const maxValue = max * 60000;
  const randomNumberOfMinutes = Math.floor(
    Math.random() * (maxValue - minValue) + minValue
  );
  return randomNumberOfMinutes;
}


