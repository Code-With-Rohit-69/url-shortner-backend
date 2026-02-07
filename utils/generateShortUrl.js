const LENGTH = 8;
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateShortUrl = () => {
    let code = "";

    for (let i = 0; i < LENGTH; i++) {
        code += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    return code;
};
