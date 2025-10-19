import type { NextApiRequest, NextApiResponse } from 'next';
import type Joi from 'joi';
import statusCodes from 'http-status-codes';

type ValidationOptions = {
  query?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
};

/**
 * Validation middleware using Joi schemas
 * Validates request query, body, or params against provided schemas
 */
const validate = (schemas: ValidationOptions) => {
  return (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const validationErrors: Record<string, string> = {};

    // Validate query parameters
    if (schemas.query) {
      const { error, value } = schemas.query.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        validationErrors.query = error.message;
      } else {
        req.query = value;
      }
    }

    // Validate request body
    if (schemas.body) {
      const { error, value } = schemas.body.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        validationErrors.body = error.message;
      } else {
        req.body = value;
      }
    }

    // If there are validation errors, return 400
    if (Object.keys(validationErrors).length > 0) {
      return res.status(statusCodes.BAD_REQUEST).json({
        error: {
          message: 'Validation failed',
          details: validationErrors,
        },
      });
    }

    next();
  };
};

export default validate;
