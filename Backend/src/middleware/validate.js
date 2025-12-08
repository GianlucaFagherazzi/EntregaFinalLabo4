// Middleware para validar los datos de entrada usando un esquema de Joi
import { AppError } from '../utils/app.error.js';

const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[source], { abortEarly: false })

        if (error) {
            const message = error.details.map((d) => d.message).join(', ')
            return next(new AppError(`Datos inválidos: ${message}`, 400, error))
        }

        next();
    };
};

export { validate };