import { compare, hash } from 'bcrypt';

export const hashText = async (text: string): Promise<string> => {
  return hash(text, 12);
};
export const compareTexts = async (
  s: string,
  hash: string,
): Promise<boolean> => {
  return compare(s, hash);
};
