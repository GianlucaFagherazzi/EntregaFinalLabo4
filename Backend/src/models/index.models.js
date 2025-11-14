import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';
import UserModel from './user.model.js';
import ProductModel from './product.model.js';
import MovementModel from './movement.model.js';
import AccountModel from './account.model.js';
import CategorysModels from './category.model.js';
import tarjetsModels from './tarjet.model.js';

// Inicializar modelos
const User = UserModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const Movement = MovementModel(sequelize, DataTypes);
const Account = AccountModel(sequelize, DataTypes);
const Category = CategorysModels(sequelize, DataTypes);
const Tarjet = tarjetsModels(sequelize, DataTypes);

// Relaciones
// User
User.hasMany(Product, { foreignKey: 'userId', as: 'Products' });
Product.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Account, { foreignKey: 'userId', as: 'Accounts' });
Account.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Movement, { foreignKey: 'userId', as: 'Movements' });
Movement.belongsTo(User, { foreignKey: 'userId' });

// Category
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'Products' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Account -> Tarjets
Account.hasMany(Tarjet, { foreignKey: 'accountId', as: 'Tarjets' });
Tarjet.belongsTo(Account, { foreignKey: 'accountId' });

// Products -> Movements
Product.hasMany(Movement, { foreignKey: 'productId', as: 'Movements' });
Movement.belongsTo(Product, { foreignKey: 'productId' });

// Tarjet -> Movements
Tarjet.hasMany(Movement, { foreignKey: 'tarjetId', as: 'Movements' });
Movement.belongsTo(Tarjet, { foreignKey: 'tarjetId' });


export { sequelize, User, Product, Movement, Account, Tarjet, Category };
