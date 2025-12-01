const NAME = {
  type: 'string',
  minLength: 2,
  maxLength: 100,
};

const DESCRIPTION = {
  type: 'string',
  minLength: 5,
};

const PRICE = {
  type: 'number',
  minimum: 1,
  maximum: 999999,
};

const ID = {
  type: 'string',
  minLength: 1,
};

const BRANDID = {
  type: 'number',
  minimum: 1,
};

const phoneSchema = {
  type: 'object',
  properties: {
    brandId: BRANDID,
    name: NAME,
    description: DESCRIPTION,
    price: PRICE,
  },
  required: [
    'brandId',
    'name',
    'description',
    'price',
  ],
  maxProperties: 4,
};

const idSchema = {
  type: 'object',
  properties: {
    id: ID,
  },
  required: ['id'],
  maxProperties: 1,
};

export const schema = {
  phone: phoneSchema,
  id: idSchema,
};
