import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt";

export const isAdminCheck = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized");
    }
  
    const token = authHeader.slice(7);
    const userInfo = verifyToken(token);
  
    if (!userInfo) {
      return res.status(401).send("Unauthorized");
    }
  
    const { role } = userInfo;
  
    if (role === "admin" || role === "teacher" || role === "other") {
      return next();
    } else {
      return res.status(401).send("Unauthorized");
    }
  };