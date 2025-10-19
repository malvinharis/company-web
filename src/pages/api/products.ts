import type { NextApiResponse } from 'next';
import connect from 'next-connect';
import statusCodes from 'http-status-codes';
import Joi from 'joi';

import type { ResponseData, ProductItem } from '@interfaces/index';

import asyncHandler from '@lib/middlewares/async';
import validate from '@lib/middlewares/validation';

import { productService } from '@services/product.service';

const schema = Joi.object({
  name: Joi.string().optional(),
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
});

export default connect()
  .use(validate({ query: schema }))
  .get(
    asyncHandler(
      async (
        req: any,
        res: NextApiResponse<ResponseData<(ProductItem & { image: string })[]>>,
      ) => {
        const data = await productService.getProducts(req.query);

        return res.status(statusCodes.OK).json(data);
      },
    ),
  );
