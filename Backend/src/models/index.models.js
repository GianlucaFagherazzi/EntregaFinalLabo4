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
// Un usuario tiene muchos productos (1 a N)
User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });

// Un usuario tiene muchas cuentas (1 a N)
User.hasMany(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

// Un usuario puede generar muchos movimientos (1 a N)
User.hasMany(Movement, { foreignKey: 'userId' });
Movement.belongsTo(User, { foreignKey: 'userId' });

// Una cuenta puede tener muchas tarjetas (1 a N)
Account.hasMany(Tarjet, { foreignKey: 'accountId' })
Tarjet.belongsTo(Account, { foreignKey: 'accountId' });

// Un producto pertenece a una categoría (1 a N)
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Un producto puede tener muchos movimientos (1 a N)
Product.hasMany(Movement, { foreignKey: 'productId' });
Movement.belongsTo(Product, { foreignKey: 'productId' });

// Una tarjeta puede tener muchos movimientos (1 a N)
Tarjet.hasMany(Movement, { foreignKey: 'tarjetId' });
Movement.belongsTo(Tarjet, { foreignKey: 'tarjetId' });

export { sequelize, User, Product, Movement, Account, Tarjet, Category };
