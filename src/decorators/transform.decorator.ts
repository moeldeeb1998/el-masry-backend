import { Transform } from 'class-transformer';

export const Trim = () => {
  return Transform(({ value }) => {
    return typeof value === 'string' ? value.trim() : value;
  });
};

export const ToLowerCase = () => {
  return Transform(({ value }) => {
    return typeof value === 'string' ? value.toLowerCase() : value;
  });
};
