import Joi from 'joi';

const accountSchema = {
    create: Joi.object({
        cbu: Joi.string()
            .pattern(/^\d+$/)
            .length(22)
            .required()
            .messages({
                'string.pattern.base': 'El CBU debe contener solo números.',
                'string.length': 'El CBU debe tener exactamente 22 dígitos.'
            }),

        userId: Joi.number()
            .integer()
            .positive()
            .required()
            .messages({
                'number.base': 'userId debe ser un número.',
                'number.integer': 'userId debe ser un entero.',
                'number.positive': 'userId debe ser un número positivo.'
            })
    }),

    update: Joi.object({
        cbu: Joi.string()
            .pattern(/^\d+$/)
            .length(22)
            .messages({
                'string.pattern.base': 'El CBU debe contener solo números.',
                'string.length': 'El CBU debe tener exactamente 22 dígitos.'
            }),

        userId: Joi.number()
            .integer()
            .positive()
            .messages({
                'number.base': 'userId debe ser un número.',
                'number.integer': 'userId debe ser un entero.',
                'number.positive': 'userId debe ser un número positivo.'
            })
    })
};

export { accountSchema };
