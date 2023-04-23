import 'dotenv/config';
import {beforeAll, describe, expect, test} from '@jest/globals';
import httpStatus from 'http-status';
import request from 'supertest';

import app from '../app';
import {seed} from '../seeds';

describe('GET /', () => {
  beforeAll(async () => {
    await seed();
  });

  test('test root path', () => {
    return request(app)
        .get('/')
        .then((response) => {
          expect(response.status).toBe(httpStatus.OK);
        });
  });

  test('test health path', () => {
    return request(app)
        .get('/health')
        .then((response) => {
          expect(response.status).toBe(httpStatus.OK);
        });
  });
});
