import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  oldPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'categoryId',
  },
}, {
  sequelize,
  modelName: 'Product',
  timestamps: false,
});
Product.sync({ alter: true })
// Product.sync({ alter: true })
//   .then(() => console.log('Table for Product model updated successfully'))
//   .catch(error => console.error('Failed to update table for Product model:', error));

export default Product;
