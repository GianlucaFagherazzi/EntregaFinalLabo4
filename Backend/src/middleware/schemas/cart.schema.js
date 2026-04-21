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
            .min(1)
            .default(1)
            .messages({
                "number.base": "quantity debe ser un número",
                "number.integer": "quantity debe ser un entero",
                "number.min": "La cantidad mínima es 1"
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
