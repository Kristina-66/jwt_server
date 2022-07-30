import config from "config";
import { omit } from "lodash";
import { FilterQuery, QueryOptions } from "mongoose";
import userModel, { User } from "../model/user.model";
import { excludedFields } from "../controllers/auth.controller";
import { signJwt } from "../middleware/jwt";
import { DocumentType } from "@typegoose/typegoose";

export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

export const findByIdAndUpdate = async (id: string) => {
  const user = await userModel
    .findByIdAndUpdate(id, { lastLogin: Date.now() })
    .lean();
  return omit(user, excludedFields);
};

export const updateStatuses = async (ids: [], status: string) => {
  const users = await userModel.updateMany({ _id: { $in: ids } }, { $set: { status: status } }, { multi: true, upsert: true, new: true });
  return omit(users, excludedFields);
};

export const deleteUsers = async (ids: []) => {
  const users = await userModel.deleteMany({ _id: { $in: ids } }, { multi: true, upsert: true, new: true });
  return omit(users, excludedFields);
};

export const findAllUsers = async () => {
  return await userModel.find();
};

export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select("+password");
};

export const signToken = async (user: DocumentType<User>) => {
  const accessToken = signJwt(
    { sub: user._id },
    {
      expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
    }
  );

  return { accessToken };
};
