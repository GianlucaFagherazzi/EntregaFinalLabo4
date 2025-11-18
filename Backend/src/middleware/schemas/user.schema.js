import Joi from "joi";

const userSchema = {
    create: Joi.object({

        name: Joi.string().required(),

        surname: Joi.string().required(),

        email: Joi.string().email().required().messages({
            "string.email": "El email no es válido."
        }),

        dni: Joi.string().pattern(/^\d+$/).length(8).required().messages({
            'string.pattern.base': 'El DNI debe contener solo números.',
            'string.length': 'El DNI debe tener exactamente 8 dígitos.'
        }),

        password: Joi.string().min(8).required().messages({
            "string.min": "La contraseña debe tener al menos 8 caracteres."
        }),
    }),

    login: Joi.object({
        email: Joi.string().email().required().messages({
            "string.email": "El email no es válido."
        }),

        password: Joi.string().min(8).required().messages({
            "string.min": "La contraseña debe tener al menos 8 caracteres."
        }),
    }),

    update: Joi.object({
    
        name: Joi.string(),

        surname: Joi.string(),

        email: Joi.string().email().messages({
            "string.email": "El email no es válido."
        }),

        dni: Joi.string().pattern(/^\d+$/).length(8).messages({
            'string.pattern.base': 'El DNI debe contener solo números.',
            'string.length': 'El DNI debe tener exactamente 8 dígitos.'
        }),
        
        password: Joi.string().min(8).messages({
            "string.min": "La contraseña debe tener al menos 8 caracteres."
        }),
    })
};

export { userSchema };
