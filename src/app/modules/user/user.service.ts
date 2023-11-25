import config from '../../config';
import { User } from '../user.model';
import bcrypt from 'bcrypt';
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

const updateUserFromDB = async (userId: string, updatedUserData: TUser) => {
  if ((await User.isUserExists(Number(userId))) === null) {
    throw new Error('User not found');
  }

  // password is hashed again after updating password
  const updatedPassword = await bcrypt.hash(
    updatedUserData.password,
    Number(config.bcrypt_salt_rounds),
  );

  // rest of the field is updated and stored in DB
  const updatedUserId = updatedUserData.userId;
  const { username, age, email, isActive, hobbies, fullName, address, orders } =
    updatedUserData;
  const { firstName, lastName } = updatedUserData.fullName;
  const { street, city, country } = updatedUserData.address;

  const result = await User.findOneAndUpdate(
    { userId },
    {
      $set: {
        password: updatedPassword,
        userId: updatedUserId,
        username,
        age,
        email,
        isActive,
        hobbies,
        fullName,
        address,
        firstName,
        lastName,
        street,
        city,
        country,
        orders,
      },
    },
    { new: true },
  );
  return result;
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
  updateUserFromDB,
  deleteUserFromDB,
};
