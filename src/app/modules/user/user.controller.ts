/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

// create user in DB
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // data validation using zod
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went Wrong',
      error: {
        code: 404,
        description: err.message + '!' || 'Something went Wrong',
      },
    });
  }
};

// get all users from DB
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message + '!' || 'Something went Wrong',
      error: err,
    });
  }
};

// get singe user by id from DB
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went Wrong',
      error: {
        code: 404,
        description: err.message + '!' || 'Something went Wrong',
      },
    });
  }
};

// update user information in DB
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;

    const zodParsedUpdatedUserData =
      userValidationSchema.parse(updatedUserData);

    const result = await UserServices.updateUserFromDB(
      userId,
      zodParsedUpdatedUserData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went Wrong',
      error: {
        code: 404,
        description: err.message + '!' || 'Something went Wrong',
      },
    });
  }
};

// delete user from DB
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await UserServices.deleteUserFromDB(userId);
    // const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went Wrong',
      error: {
        code: 404,
        description: err.message + '!' || 'Something went Wrong',
      },
    });
  }
};

// add order to user in DB
const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;

    // fetching the user
    const user = await UserServices.getSingleUserFromDB(userId);

    if (!user) {
      throw new Error('User not Found');
    }

    const newOrder = {
      productName,
      price,
      quantity,
    };

    user?.orders?.push(newOrder);

    await UserServices.updateUserFromDB(userId, user);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went Wrong',
      error: {
        code: 404,
        description: err.message + '!' || 'Something went Wrong',
      },
    });
  }
};

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(userId);

    const allOrders = result?.orders;

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: allOrders },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went Wrong',
      error: {
        code: 404,
        description: err.message + '!' || 'Something went Wrong',
      },
    });
  }
};

const calculatePriceOfOrderOfSingleUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(userId);

    const allOrders = result?.orders;

    const totalPrice = allOrders
      ?.reduce((acc, order) => acc + order.price * order.quantity, 0)
      .toFixed(2);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: Number(totalPrice) },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went Wrong',
      error: {
        code: 404,
        description: err.message + '!' || 'Something went Wrong',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrderToUser,
  getAllOrdersForUser,
  calculatePriceOfOrderOfSingleUser,
};
