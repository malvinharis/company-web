import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Async handler middleware to wrap async route handlers
 * and catch any errors, passing them to the error handler
 */
const asyncHandler = (fn: Function) => {
  return (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
