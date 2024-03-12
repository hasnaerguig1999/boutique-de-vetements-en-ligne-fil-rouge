import express from 'express';
import "express-async-errors"
import router from './routes';
import { errorMiddleware } from './middlewares/error';
import sequelize from './config/database';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

app.use(cors())
app.use(express.json());
app.use(router);

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server is running on port 8000");


sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));
});