import Joi from "joi";

export const checkoutSchema = {

  create: Joi.object({
    accountId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        "number.base": "accountId debe ser un número",
        "number.integer": "accountId debe ser un entero",
        "number.positive": "accountId debe ser positivo",
        "any.required": "accountId es obligatorio"
      }),

    tarjetId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        "number.base": "tarjetId debe ser un número",
        "number.integer": "tarjetId debe ser un entero",
        "number.positive": "tarjetId debe ser positivo",
        "any.required": "tarjetId es obligatorio"
      })
  })

};