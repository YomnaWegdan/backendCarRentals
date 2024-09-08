import { dbConnection } from '../database/dbConnection.js';
import cors from 'cors';
import { globalError } from "./middlewares/asyncHandlerError.js";
import * as routers from './modules/index.routes.js';
import { appError } from './utilities/appError.js';
import { deleteFromCloudinary } from './utilities/deleteFromCloudinary.js';
import { deleteFromDatabase } from './utilities/deleteFromDatabase.js';

export const initApp = (app, express) => {
  // Configure CORS
  app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this domain
    methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
  }));

  app.use(express.json());

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
