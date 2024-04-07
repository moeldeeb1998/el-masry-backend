import * as bcrypt from 'bcrypt';

const getSalt = async (): Promise<string> => {
  return await bcrypt.genSalt();
};

export const hash = async (plainText: string): Promise<string> => {
  const salt = await getSalt();
  return await bcrypt.hash(plainText, salt);
};

export const isMatch = (plainText: string, hashValue: string) => {
  return bcrypt.compare(plainText, hashValue);
};
