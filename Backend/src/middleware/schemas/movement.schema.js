import Joi from 'joi';

export const movementSchema = {
  create: Joi.object({
    productId: Joi.number()
      .integer()
      .positive()
      .required(),

    quantity: Joi.number()
      .positive()
      .required(),

    date: Joi.date()
      .optional(),

    movementUsers: Joi.array()
      .items(
        Joi.object({
          userId: Joi.number()
            .integer()
            .positive()
            .required(),

          accountId: Joi.number()
            .integer()
            .positive()
            .required(),

          tarjetId: Joi.number()
            .integer()
            .positive()
            .required(),

          rol: Joi.string()
            .valid('buyer', 'seller')
            .required()
        })
      )
      .min(2)
      .required()
      .custom((arr, helpers) => {
        const roles = arr.map(x => x.rol);

        if (!roles.includes('buyer'))
          return helpers.error('any.custom', 'Falta rol buyer');

        if (!roles.includes('seller'))
          return helpers.error('any.custom', 'Falta rol seller');

        if (roles.filter(r => r === 'buyer').length > 1)
          return helpers.error('any.custom', 'Solo puede haber un buyer');

        if (roles.filter(r => r === 'seller').length > 1)
          return helpers.error('any.custom', 'Solo puede haber un seller');

        return arr;
      }, 'Validación de roles buyer/seller')
  })

}