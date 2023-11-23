import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// will call controller
router.post('/create-user', UserControllers.createUser);
