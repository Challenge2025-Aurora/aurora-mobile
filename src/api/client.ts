export const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));
export const stub = async <T>(value: T, ms = 400): Promise<T> => {
  await delay(ms);
  return value;
}