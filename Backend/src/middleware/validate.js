// src/middlewares/validateSchema.js
import { AppError } from '../utils/app.error.js';

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            const message = error.details.map((d) => d.message).join(', ')
            return next(new AppError(`Datos inválidos: ${message}`, 400, error))
        }

        next();
    };
};

export { validate };