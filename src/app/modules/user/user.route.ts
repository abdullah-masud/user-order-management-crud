import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// will call controller
router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.put('/:userId', UserControllers.updateUser);

router.delete('/:userId', UserControllers.deleteUser);

router.put('/:userId/orders', UserControllers.addOrderToUser);

router.get('/:userId/orders', UserControllers.getAllOrdersForUser);

router.get(
  '/:userId/orders/total-price',
  UserControllers.calculatePriceOfOrderOfSingleUser,
);

export const UserRoutes = router;
