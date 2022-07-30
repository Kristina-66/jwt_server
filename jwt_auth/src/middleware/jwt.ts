import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("accessTokenPrivateKey");

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, privateKey) as T;
  } catch (error) {
    return null;
  }
};
