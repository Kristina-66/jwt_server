import { NextFunction, Request, Response } from 'express';
import AppError from '../middleware/appError';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return next(new AppError(`Invalid token or session has expired`, 401));
    }

    if (user.status === "block") {
      return next(new AppError('You are BLOCKED', 401));
    }

    next();
  } catch (err: any) {
    next(err);
  }
};

