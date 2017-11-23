const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.STRING,
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = Product
