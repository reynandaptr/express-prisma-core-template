import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import httpStatus from 'http-status';
import morgan from 'morgan';

import routerV1 from './routes/v1';
import {handleResponseSuccess} from './utils/response';

const app = express();

app.use(bodyParser.json({
  limit: '1mb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1mb',
}));
app.use(cors());
app.use(morgan('short'));

app.get('/', (req, res) => {
  handleResponseSuccess(res, httpStatus.OK, {message: 'Hello World!'});
});

app.get('/health', (req, res) => {
  handleResponseSuccess(res, httpStatus.OK, httpStatus[httpStatus.OK]);
});

app.use('/v1', routerV1);

export default app;
