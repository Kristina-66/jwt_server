import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../services/user.service';
import AppError from '../middleware/appError';
import { verifyJwt } from '../middleware/jwt';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.accessToken) {
      access_token = req.cookies.accessToken;
    }

    if (!access_token) {
      return next(new AppError('You are not logged in', 401));
    }

    // Validate Access Token
    const decoded = verifyJwt<{ sub: string }>(access_token);
    if (!decoded) {
      return next(new AppError(`Invalid token or user doesn't exist`, 401));
    }

    // Check if user still exist
    const user = await findUserById(decoded.sub);

    if (!user) {
      return next(new AppError(`User with that token no longer exist`, 401));
    }

    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
