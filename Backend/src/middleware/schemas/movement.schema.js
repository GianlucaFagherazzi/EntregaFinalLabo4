import Joi from 'joi';

const movementSchema = {
  
  create: Joi.object({
    
    productId: Joi.number()
      .integer()
      .positive()
      .required(),
    
    quantity: Joi.number()
      .integer()
      .min(1)
      .required(),

    totalAmount: Joi.number()
      .positive()
      .required(),

    date: Joi.date().optional() // Si no viene, Sequelize usa NOW
  }),

};

export { movementSchema };
