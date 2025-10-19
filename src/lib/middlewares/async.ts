import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextHandler } from 'next-connect';

/**
 * Async handler middleware to wrap async route handlers
 * and catch any errors, passing them to the error handler
 */
type AsyncHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => Promise<void> | void;

const asyncHandler = (fn: AsyncHandler) => {
  return (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
