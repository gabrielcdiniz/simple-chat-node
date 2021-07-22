import cors from 'cors';
import { config } from 'dotenv';
import express, { Application as ExpressApplication } from 'express';
import { readFileSync } from 'fs';
import { createServer, Server } from 'https';
import { join } from 'path';

class App {
  public express!: ExpressApplication;
  public server!: Server;

  constructor() {
    config();

    const {
      SSL_PRIVATE_KEY,
      SSL_CERTIFICATE,
      SSL_CA,

      ENVIRONMENT
    } = process.env;

    const certificate = {
      key: readFileSync(SSL_PRIVATE_KEY, 'utf-8'),
      cert: readFileSync(SSL_CERTIFICATE, 'utf-8'),
      ca: readFileSync(SSL_CA, 'utf-8')
    };

    const options = ENVIRONMENT === 'production'
      ? certificate
      : {};

    this.express = express();

    this.server = createServer(options, this.express);

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

export default new App().server;
