import {Response} from 'express';
import httpStatus from 'http-status';
import {ZodError} from 'zod';

export const handleResponseSuccess = (res: Response, status: number, data?: any) => {
  res.status(status).json({
    success: true,
    message: null,
    data,
    error: null,
  });
};

const responseError = (res: Response, status: number, message: string, err?: any) => {
  res.status(status).json({
    success: false,
    message,
    data: null,
    error: err,
  });
};

const isBadRequest = (error: unknown): boolean => {
  return error instanceof ZodError;
};

export const handleResponseError = (res: Response, error: unknown, unauthorized?: boolean) => {
  if (unauthorized) {
    return responseError(res, httpStatus.UNAUTHORIZED, httpStatus[httpStatus.UNAUTHORIZED], error);
  }
  if (isBadRequest(error)) {
    return responseError(res, httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST], error);
  }
  responseError(res, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR], error);
};
