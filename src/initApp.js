import { dbConnection } from '../database/dbConnection.js';
import cors from 'cors';
import { globalError } from "./middlewares/asyncHandlerError.js";
import * as routers from './modules/index.routes.js';
import { appError } from './utilities/appError.js';
import { deleteFromCloudinary } from './utilities/deleteFromCloudinary.js';
import { deleteFromDatabase } from './utilities/deleteFromDatabase.js';

export const initApp = (app, express) => {
    app.use(cors())
 

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  app.get('/', (req, res) => res.status(200).json({ message: 'success' }));

  app.use('/auth', routers.userRouter);
  app.use('/cars', routers.carRouter);
  app.use('/booking', routers.bookingRouter);
  app.use('/brand', routers.brandRouter);

  dbConnection();

  app.use('*', (req, res, next) => next(new appError(`route not found ${req.originalUrl}`), 404));

  app.use(globalError, deleteFromCloudinary, deleteFromDatabase);

  // Handle error outside express
  app.get('/', (req, res) => res.send('Hello World!'));
}
