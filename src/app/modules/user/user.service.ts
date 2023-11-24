import { User } from '../user.model';
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
  const result = await User.findOne({ userId });
  return result;
};

const updateUserFromDB = async (userId: string, updatedUserData: TUser) => {
  const result = await User.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
