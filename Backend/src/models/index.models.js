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
User.hasMany(Product, { foreignKey: 'userId', as: 'Products', onDelete: 'SET NULL' });
Product.belongsTo(User, { foreignKey: 'userId', as: 'User', onDelete: 'SET NULL' });

// -------- USER ↔ ACCOUNT --------
User.hasMany(Account, { foreignKey: 'userId', as: 'Accounts', onDelete: 'SET NULL' });
Account.belongsTo(User, { foreignKey: 'userId', as: 'User', onDelete: 'SET NULL' });

// -------- ACCOUNT ↔ TARJET --------
Account.hasMany(Tarjet, { foreignKey: 'accountId', as: 'Tarjets', onDelete: 'SET NULL' });
Tarjet.belongsTo(Account, { foreignKey: 'accountId', as: 'Account', onDelete: 'SET NULL' });

// -------- CATEGORY ↔ PRODUCT --------
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'Products', onDelete: 'SET NULL' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'Category', onDelete: 'SET NULL' });

// -------- PRODUCT ↔ MOVEMENT --------
Product.hasMany(Movement, { foreignKey: 'productId', as: 'Movements', onDelete: 'SET NULL' });
Movement.belongsTo(Product, { foreignKey: 'productId', as: 'Product', onDelete: 'SET NULL' });

// -------- MOVEMENT ↔ MOVEMENTUSER --------
Movement.hasMany(MovementUser, { foreignKey: 'idMovement', as: 'MovementUsers', onDelete: 'RESTRICT' });
MovementUser.belongsTo(Movement, { foreignKey: 'idMovement', as: 'Movement', onDelete: 'RESTRICT' });

// -------- USER ↔ MOVEMENTUSER --------
User.hasMany(MovementUser, { foreignKey: 'idUser', as: 'MovementUsers', onDelete: 'RESTRICT' });
MovementUser.belongsTo(User, { foreignKey: 'idUser', as: 'User', onDelete: 'RESTRICT' });

// -------- MOVEMENTUSER ↔ SNAPSHOT --------
MovementUser.hasMany(Snapshot, { foreignKey: 'idMovementUser', as: 'Snapshots', onDelete: 'RESTRICT' });
Snapshot.belongsTo(MovementUser, { foreignKey: 'idMovementUser', as: 'MovementUser', onDelete: 'RESTRICT' });

export { sequelize, User, Product, Movement, MovementUser, Snapshot, Account, Tarjet, Category };
