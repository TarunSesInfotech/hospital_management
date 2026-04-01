// import jwt from "jsonwebtoken";
import jwt from "jsonwebtoken";
const SECRET="shobhit"

export const generateToken = (u:any) =>
  jwt.sign({ id:u._id}, SECRET, { expiresIn:"1d" });

export const verifyToken = (t:string) =>
  jwt.verify(t, SECRET);