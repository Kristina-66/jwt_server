import { NextFunction, Request, Response } from 'express';
import { findAllUsers, updateStatuses, deleteUsers } from '../services/user.service';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { id, status } = req.body
    const user = await updateStatuses(id, status);
    res.status(200).json({
      status: 'success',
      result: user,

    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await deleteUsers(req.body.id);
    res.status(200).json({
      status: 'success',
      result: users,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};