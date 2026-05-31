import Joi from 'joi';

const accountSchema = {
  create: Joi.object({
    userId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        'number.base': 'userId debe ser un número.',
        'number.integer': 'userId debe ser un entero.',
        'number.positive': 'userId debe ser un número positivo.',
        'any.required': 'userId es obligatorio.'
      })
  }),

};

export { accountSchema };