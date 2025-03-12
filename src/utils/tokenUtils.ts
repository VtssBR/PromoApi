import jwt from "jsonwebtoken";

const SECRET = String(process.env.JWT_SECRET);

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, SECRET,{ expiresIn: "1h" });
  };
  
  export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET);
  };