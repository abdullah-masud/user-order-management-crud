import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxlength: [20, 'First Name cannot be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Last Name cannot be more than 20 characters'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});

const ordersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, 'Product Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

// main schema
const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User Name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password cannot be more than 20 characters'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full Name is Required'],
  },
  age: {
    type: Number,
    required: [true, 'Age ID is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'isActive is required'],
  },
  hobbies: [
    {
      type: String,
      required: [true, 'Hobbies is required'],
    },
  ],
  address: {
    type: addressSchema,
    required: [true, 'Address is Required'],
  },
  orders: [ordersSchema],
});

// creating a custom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

// pre save middleware / hook
// hashing password and save into DB
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware
userSchema.pre('find', function (next) {
  this.projection({
    username: 1,
    fullName: { firstName: 1, lastName: 1, _id: 0 },
    age: 1,
    email: 1,
    address: { street: 1, city: 1, country: 1, _id: 0 },
    _id: 0,
  });
  next();
});

export const User = model<TUser, UserModel>('User', userSchema);
