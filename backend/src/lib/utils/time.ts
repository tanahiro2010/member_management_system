const toMilliseconds = (num: number, unit: 'second' | 'minute' | 'hour' | 'day'): number => {
  switch (unit) {
    case 'second':
      return num * 1000;
    case 'minute':
      return num * 60 * 1000;
    case 'hour':
      return num * 60 * 60 * 1000;
    case 'day':
      return num * 24 * 60 * 60 * 1000;
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
}

const toSeconds = (num: number, unit: 'minute' | 'hour' | 'day'): number => {
  switch (unit) {
    case 'minute':
      return num * 60;
    case 'hour':
      return num * 60 * 60;
    case 'day':
      return num * 24 * 60 * 60;
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
}

export const timeUtils = {
  toMilliseconds,
  toSeconds
};