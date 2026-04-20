import { Request, Response, NextFunction } from 'express';

//  functional middleware alternative any time your middleware doesn't need any dependencies.
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};