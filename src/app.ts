import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send({ message: 'User Order Management Assignment 2' });
};

app.get('/', getAController);

export default app;
