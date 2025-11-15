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
User.hasMany(Product, { foreignKey: 'userId', as: 'Products', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'userId', as: 'User', onDelete: 'CASCADE' });

User.hasMany(Account, { foreignKey: 'userId', as: 'Accounts', onDelete: 'CASCADE' });
Account.belongsTo(User, { foreignKey: 'userId', as: 'User', onDelete: 'CASCADE' });

User.hasMany(Movement, { foreignKey: 'userId', as: 'Movements', onDelete: 'SET NULL' });
Movement.belongsTo(User, { foreignKey: 'userId', as: 'User', onDelete: 'SET NULL' });

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'Products', onDelete: 'SET NULL' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'Category', onDelete: 'SET NULL' });

Account.hasMany(Tarjet, { foreignKey: 'accountId', as: 'Tarjets', onDelete: 'CASCADE' });
Tarjet.belongsTo(Account, { foreignKey: 'accountId', as: 'Account', onDelete: 'CASCADE' });

Product.hasMany(Movement, { foreignKey: 'productId', as: 'Movements', onDelete: 'SET NULL' });
Movement.belongsTo(Product, { foreignKey: 'productId', as: 'Product', onDelete: 'SET NULL' });

Tarjet.hasMany(Movement, { foreignKey: 'tarjetId', as: 'Movements', onDelete: 'SET NULL' });
Movement.belongsTo(Tarjet, { foreignKey: 'tarjetId', as: 'Tarjet', onDelete: 'SET NULL' });


export { sequelize, User, Product, Movement, Account, Tarjet, Category };
