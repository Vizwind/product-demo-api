const Sequelize = require('sequelize')
const db = require('../db')
const elastic = require('../../elastic/client')

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

Product.afterCreate(async (product, options) => {
  await elastic.create({
    index: 'product',
    type: 'doc',
    id: product.id,
    body: product
  })
})


module.exports = Product
