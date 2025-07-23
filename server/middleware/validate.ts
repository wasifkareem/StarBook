import {ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateBody =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      console.error("Zod validation error:", result.error.issues); 
      return res.status(400).json({ error: result.error.issues });
      
    }
    req.body = result.data; 
    next();
  };

  export const validateQuery = (schema:ZodType<any>)=>(req:Request,res:Response, next:NextFunction)=>{
    const result = schema.safeParse(req.query);
    if(!result.success){
      console.error("Zod validation error:", result.error.issues); 
      return res.status(400).json({error:result.error.issues})
    }
    req.query = result.data;
    next();
  }