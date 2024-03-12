import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Product from './productsModel'; 

const Category = sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
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
}, {
  timestamps: false,
});

Category.sync({ alter: true })


Category.hasMany(Product);
export default Category;
