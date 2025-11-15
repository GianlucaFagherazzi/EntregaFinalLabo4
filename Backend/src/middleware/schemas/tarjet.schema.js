import Joi from 'joi';

const tarjetSchema = {

  create: Joi.object({
    number: Joi.string()
      .pattern(/^\d+$/)
      .min(6)      // puedes ajustar si querés, BIGINT soporta hasta 19 dígitos
      .max(19)
      .required()
      .messages({
        'string.pattern.base': 'El número de tarjeta debe contener solo números.'
      }),

    balance: Joi.number()
      .required(),

    accountId: Joi.number()
      .integer()
      .positive()
      .required()
  }),

  update: Joi.object({
    number: Joi.string()
      .pattern(/^\d+$/)
      .min(6)
      .max(19)
      .optional(),

    balance: Joi.number()
      .optional(),

    accountId: Joi.number()
      .integer()
      .positive()
      .optional()
  })
};

export { tarjetSchema };
