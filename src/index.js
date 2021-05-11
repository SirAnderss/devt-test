import express from 'express';
import morgan from 'morgan';
import path from 'path';

import routes from './routes/profile.routes';
import mongoose from './database';

const APP = express();
const PORT = 3000;

// Settings
APP.set('port', process.env.PORT || PORT);

// Middleware
APP.use(morgan('dev'));
APP.use(express.json());

// Routes
APP.use('/api/profiles', routes);

// // Static files
APP.use(express.static(path.join(__dirname, 'public')));

APP.listen(APP.get('port'), () => {
  console.log(`listening on => ${APP.get('port')}`);
});
