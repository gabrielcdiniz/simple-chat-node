import { config } from 'dotenv';
import App from './app';

config();

const { SERVER_PORT } = process.env;

App.listen(SERVER_PORT || 3333, console.log);
