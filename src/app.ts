/* c8 ignore start */
// @ts-ignore
// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function() {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
/* c8 ignore end */
import 'dotenv/config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import httpStatus from 'http-status';
import morgan from 'morgan';

import routerV1 from './routes/v1';
import {getEnvvarValue} from './utils/envvar';
import {handleResponseError, handleResponseSuccess} from './utils/response'; ;


const app = express();

const {
  value: appURL,
} = getEnvvarValue('APP_URL', true, (error) => {
  if (error) {
    throw new Error(error);
  }
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return handleResponseError(res, httpStatus.TOO_MANY_REQUESTS, httpStatus[httpStatus.TOO_MANY_REQUESTS], false);
  },
});

app.use(limiter);
app.use(bodyParser.json({
  limit: '1mb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1mb',
}));
app.use(cors({
  origin: appURL,
  credentials: true,
}));
app.use(cookieParser());
app.use(morgan('short'));

app.get('/', (req, res) => {
  handleResponseSuccess(res, httpStatus.OK, {message: 'Hello World!'});
});

app.get('/health', (req, res) => {
  handleResponseSuccess(res, httpStatus.OK, httpStatus[httpStatus.OK]);
});

app.use('/v1', routerV1);

export default app;
