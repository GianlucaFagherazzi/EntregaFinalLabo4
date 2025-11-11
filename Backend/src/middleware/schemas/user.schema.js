import Joi from 'joi';

const userSchema = {
    create: Joi.object({
        dni: Joi.string().pattern(/^\d+$/).required().length(8).messages({
            'string.pattern.base': 'DNI debe contener solo números y tener al menos 8 dígitos.'
        }),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }),
}

export { userSchema };