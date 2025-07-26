import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface CustomJwtPayload extends JwtPayload {
  email: string;
  role: string;
}

export const createToken = (payload: Record<string, unknown>): string => {
  return jwt.sign(payload, process.env.TokenSecrete as Secret, {
    expiresIn: "24h",
  });
};


export const verifyToken = (token: string): CustomJwtPayload | undefined => {
  try {
    return jwt.verify(token, process.env.TokenSecrete as Secret) as CustomJwtPayload;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};