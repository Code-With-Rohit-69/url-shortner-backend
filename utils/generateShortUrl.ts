const LENGTH = 8;
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateShortUrl = (): string => {
  let code = "";

  for (let i = 0; i < LENGTH; i++) {
    const index = Math.floor(Math.random() * CHARS.length);
    code += CHARS.charAt(index);
  }

  return code;
};
