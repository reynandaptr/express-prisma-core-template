import {Prisma} from '@prisma/client';
import {Response} from 'express';
import httpStatus from 'http-status';
import {ZodError} from 'zod';

import {prismaNotFoundErrorCode} from '../constants';

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

const isPrismaError = (error: unknown): boolean => {
  return error instanceof Prisma.PrismaClientInitializationError ||
  error instanceof Prisma.PrismaClientKnownRequestError ||
  error instanceof Prisma.PrismaClientUnknownRequestError ||
  error instanceof Prisma.PrismaClientRustPanicError ||
  error instanceof Prisma.PrismaClientValidationError;
};

export const handleResponseError = (res: Response, error: unknown, message: string | null, unauthorized: boolean, is404?: boolean) => {
  if (is404) {
    return responseError(res, httpStatus.NOT_FOUND, message ? message : httpStatus[httpStatus.NOT_FOUND], error);
  }
  if (error && isBadRequest(error)) {
    return responseError(res, httpStatus.BAD_REQUEST, message ? message : httpStatus[httpStatus.BAD_REQUEST], error);
  }
  if (error && isPrismaError(error)) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === prismaNotFoundErrorCode) {
      return responseError(res, httpStatus.NOT_FOUND, message ? message : httpStatus[httpStatus.NOT_FOUND], error);
    }
    return responseError(res, httpStatus.INTERNAL_SERVER_ERROR, message ? message : httpStatus[httpStatus.INTERNAL_SERVER_ERROR], error);
  }
  if (unauthorized) {
    return responseError(res, httpStatus.UNAUTHORIZED, message ? message : httpStatus[httpStatus.UNAUTHORIZED], error);
  }
  responseError(res, httpStatus.INTERNAL_SERVER_ERROR, message ? message : httpStatus[httpStatus.INTERNAL_SERVER_ERROR], error);
};
