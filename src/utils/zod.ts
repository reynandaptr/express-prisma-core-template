import type {Request} from 'express';
import {AnyZodObject, z} from 'zod';

export const validateRequest = <T extends AnyZodObject>(
  schema: T,
  req: Request,
): Promise<z.infer<T>> => {
  return schema.parseAsync(req);
};
