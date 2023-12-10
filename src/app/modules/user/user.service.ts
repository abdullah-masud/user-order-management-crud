// import config from '../../config';
import { User } from '../user.model';
// import bcrypt from 'bcrypt';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already Exists!');
  }

  const result = await User.create(userData); // built in static method

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  if ((await User.isUserExists(Number(userId))) === null) {
    throw new Error('User not found');
  }

  const result = await User.findOne({ userId });
  return result;
};

const updateUserIntoDB = async (
  userId: string,
  updatedData: Partial<TUser>,
) => {
  // Check if the user exists before updating
  if ((await User.isUserExists(Number(userId))) === null) {
    throw new Error('User not found');
  }

  // Update the user based on userId
  const result = await User.findOneAndUpdate({ userId }, { $set: updatedData });

  if (!result) {
    throw new Error('Failed to update user');
  }

  const updatedUser = await User.findOne({ userId });
  return updatedUser;
};

const deleteUserFromDB = async (userId: string) => {
  if ((await User.isUserExists(Number(userId))) === null) {
    throw new Error('User not found');
  }

  const result = await User.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
