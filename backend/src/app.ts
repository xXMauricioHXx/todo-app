import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { logger } from './logger';
import { TodoController } from './http/controllers/todo';
import { errorHandlerMiddleware } from './http/middlewares/errorHandle';
import { NotFoundError } from './errors';

interface ApplicationCofig {
  httpPort: number;
  mongoUrl: string;
}

export class Application {
  readonly config: ApplicationCofig;
  constructor(config: ApplicationCofig) {
    this.config = config;
  }

  connectDB() {
    mongoose.connect(this.config.mongoUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.Promise = global.Promise;
    return mongoose.connection;
  }

  loadControllers() {
    return [new TodoController()];
  }

  start() {
    const db = this.connectDB();
    db.on('connected', () => {
      const app = express();
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      this.loadControllers().forEach(controller => {
        controller.register(app);
      });

      app.use('*', (req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
      });

      app.use(errorHandlerMiddleware);
      app.listen(this.config.httpPort, () => {
        logger.info(`Server is running on port ${this.config.httpPort}`);
      });
    });
    db.on('error', err => {
      throw new Error(`Fail to connect mongodb: ${err.message}`);
    });
  }
}
