import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';
import AccountModel from './account.model.js';
import CategorysModels from './category.model.js';
import MovementModel from './movement.model.js';
import movementUserModel from './movementUser.model.js';
import ProductModel from './product.model.js';
import snapshotModel from './snapshot.model.js';
import tarjetsModels from './tarjet.model.js';
import UserModel from './user.model.js';

// Inicializar modelos
const Account = AccountModel(sequelize, DataTypes);
const Category = CategorysModels(sequelize, DataTypes);
const Movement = MovementModel(sequelize, DataTypes);
const MovementUser = movementUserModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const Snapshot = snapshotModel(sequelize, DataTypes);
const Tarjet = tarjetsModels(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

// Relaciones

// -------- USER ↔ PRODUCT --------
User.hasMany(Product, { foreignKey: 'userId', as: 'Products'});
Product.belongsTo(User, { foreignKey: 'userId', as: 'User'});

// -------- USER ↔ ACCOUNT --------
User.hasMany(Account, { foreignKey: 'userId', as: 'Accounts'});
Account.belongsTo(User, { foreignKey: 'userId', as: 'User'});

// -------- ACCOUNT ↔ TARJET --------
Account.hasMany(Tarjet, { foreignKey: 'accountId', as: 'Tarjets'});
Tarjet.belongsTo(Account, { foreignKey: 'accountId', as: 'Account'});

// -------- CATEGORY ↔ PRODUCT --------
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'Products', onDelete: 'SET NULL'});
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'Category', onDelete: 'SET NULL'});

// -------- PRODUCT ↔ MOVEMENT --------
Product.hasMany(Movement, { foreignKey: 'productId', as: 'Movements'});
Movement.belongsTo(Product, { foreignKey: 'productId', as: 'Product'});

// -------- ACCOUNT ↔ MOVEMENTUSER --------
Account.hasMany(MovementUser, { foreignKey: 'accountId', as: 'MovementUsers'});
MovementUser.belongsTo(Account, { foreignKey: 'accountId', as: 'Account'});

// -------- TARJET ↔ MOVEMENTUSER --------
Tarjet.hasMany(MovementUser, { foreignKey: 'tarjetId', as: 'MovementUsers'});
MovementUser.belongsTo(Tarjet, { foreignKey: 'tarjetId', as: 'Tarjet'});

// -------- MOVEMENT ↔ MOVEMENTUSER --------
Movement.hasMany(MovementUser, { foreignKey: 'movementId', as: 'MovementUsers'});
MovementUser.belongsTo(Movement, { foreignKey: 'movementId', as: 'Movement'});

// -------- USER ↔ MOVEMENTUSER --------
User.hasMany(MovementUser, { foreignKey: 'userId', as: 'MovementUsers'});
MovementUser.belongsTo(User, { foreignKey: 'userId', as: 'User'});

// -------- MOVEMENT ↔ SNAPSHOT --------
Movement.hasOne(Snapshot, { foreignKey: 'movementId', as: 'Snapshot' });
Snapshot.belongsTo(Movement, { foreignKey: 'movementId', as: 'Movement' });

export { sequelize, User, Product, Movement, MovementUser, Snapshot, Account, Tarjet, Category };
