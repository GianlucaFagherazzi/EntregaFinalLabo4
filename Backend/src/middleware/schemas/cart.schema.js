import Joi from "joi";

export const cartSchema = {
  addItem: Joi.object({
    productId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        "number.base": "productId debe ser un número",
        "number.integer": "productId debe ser un entero",
        "number.positive": "productId debe ser positivo",
        "any.required": "productId es obligatorio"
      }),

    quantity: Joi.number()
      .integer()
      .invalid(0)
      .required()
      .messages({
        "number.base": "quantity debe ser un número",
        "number.integer": "quantity debe ser un entero",
        "any.invalid": "La cantidad no puede ser 0",
        "any.required": "La cantidad es obligatoria"
      })
  }),

  removeItem: Joi.object({
    productId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        "number.base": "productId debe ser un número",
        "number.integer": "productId debe ser un entero",
        "number.positive": "productId debe ser positivo",
        "any.required": "productId es obligatorio"
      })
  }),

  clearCart: Joi.object({})
};