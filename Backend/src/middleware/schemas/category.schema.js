import Joi from 'joi';

const categorySchema = {
    create: Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.empty': 'El nombre de la categoría es obligatorio.',
                'string.min': 'El nombre debe tener al menos 2 caracteres.',
                'string.max': 'El nombre no debe superar los 50 caracteres.'
            })
    }),

    update: Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .messages({
                'string.min': 'El nombre debe tener al menos 2 caracteres.',
                'string.max': 'El nombre no debe superar los 50 caracteres.'
            })
    })
};

export { categorySchema };
