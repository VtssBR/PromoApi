import jwt from "jsonwebtoken";

const SECRET = String(process.env.JWT_SECRET);

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, SECRET,{ expiresIn: "1h" });
  };
  
  export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET);
  };