import Joi from 'joi';

const productSchema = {
    create: Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "El nombre es obligatorio."
        }),

        description: Joi.string().allow(null, ''),

        price: Joi.number().positive().required().messages({
            "number.base": "El precio debe ser un número.",
            "number.positive": "El precio debe ser mayor a 0.",
            "any.required": "El precio es obligatorio."
        }),

        stock: Joi.number().integer().min(0).default(0).messages({
            "number.base": "El stock debe ser un número.",
            "number.integer": "El stock debe ser un número entero.",
            "number.min": "El stock no puede ser negativo."
        }),

        userId: Joi.number().required().messages({
            "number.base": "El ID de usuario debe ser un número.",
            "any.required": "El ID de usuario es obligatorio."
        }),

        categoryId: Joi.number().required().messages({
            "number.base": "El ID de la categoria debe ser un número.",
            "any.required": "El ID de la categoría es obligatorio."
        })
    }),

    update: Joi.object({
        name: Joi.string(),
        description: Joi.string().allow(null, ''),
        price: Joi.number().positive(),
        stock: Joi.number().integer().min(0),
        userId: Joi.number(),
        categoryId: Joi.number(),
    }).min(1).messages({
        "object.min": "Debes enviar al menos un campo para actualizar."
    })
};

export { productSchema };
