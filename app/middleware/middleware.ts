// import { verifyToken } from "./jwt";

import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = verifyToken(token);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
};