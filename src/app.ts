import cors from 'cors';
import express, { Application as ExpressApplication } from 'express';
import { join } from 'path';

// sucrase ./src/client -d ./public/js --transforms typescript,imports

class App {
  public express: ExpressApplication;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.static(join(__dirname, '..', 'public')));
  }

  private routes() {
    this.express.get('/', (req, res) => {
      return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    });
  }
}

export default new App().express;
