import dotenv from 'dotenv';
import { Application } from './app';

dotenv.config();

const application = new Application({
  httpPort: (process.env.HTTP_PORT && parseInt(process.env.HTTP_PORT)) || 3000,
  mongoUrl: process.env.MONGO_URL || '',
});

setImmediate(async () => {
  application.start();
});
