import 'dotenv/config';

import * as Youch from 'youch';
import express from 'express';
import 'express-async-errors';
import { connect, set } from 'mongoose';
import cors from 'cors';
import { Server } from 'http';
import SocketIO from 'socket.io';
import routes from './routes';
import { webSockets } from './webSockets';

class App {
  constructor() {
    this.app = express();
    this.server = Server(this.app);
    this.socketIo = new SocketIO(this.server);

    this.webSocketsConfig();
    this.middlewares();
    this.database();
    this.routes();

    this.exceptionHandler();
  }

  webSocketsConfig() {
    webSockets(this.server);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  database() {
    connect(
      'mongodb+srv://admin:admin@fabricio-krmro.mongodb.net/omni10?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    set('useCreateIndex', true);
  }

  routes() {
    this.app.use(routes);
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal app error' });
    });
  }
}

export default new App().server;
