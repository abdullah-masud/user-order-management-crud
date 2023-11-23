import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

// main
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
};

// for creating static
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}

// instance
// export type UserMethods = {
//   isUserExists(userId: number): Promise<TUser | null>;
// };

// export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
