import Joi from 'joi';

const movementSchema = {
  
  create: Joi.object({
    date: Joi.date().optional(), // Si no viene, Sequelize usa NOW

    type: Joi.string()
      .valid('PURCHASE')
      .required(),

    quantity: Joi.number()
      .integer()
      .min(1)
      .required(),

    amount: Joi.number()
      .positive()
      .required(),

    productId: Joi.number()
      .integer()
      .positive()
      .required(),

    userId: Joi.number()
      .integer()
      .positive()
      .required(),

    tarjetId: Joi.number()
      .integer()
      .positive()
      .required()
  }),

  update: Joi.object({
    date: Joi.date().optional(),

    type: Joi.string()
      .valid('PURCHASE', 'SELL', 'ADJUST')
      .optional(),

    quantity: Joi.number()
      .integer()
      .min(1)
      .optional(),

    amount: Joi.number()
      .positive()
      .optional(),

    productId: Joi.number()
      .integer()
      .positive()
      .optional(),

    userId: Joi.number()
      .integer()
      .positive()
      .optional(),

    tarjetId: Joi.number()
      .integer()
      .positive()
      .optional()
  })
};

export { movementSchema };
