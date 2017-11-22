const Sequelize = require('sequelize');
const sequelize = new Sequelize('product_demo_dev', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.DECIMAL,
}, {
  timestamps: false
})

Product.sync()