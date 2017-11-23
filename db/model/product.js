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
  console.log(`after create: ${product}`)
  await elastic.create({
    index: 'product',
    type: 'name',
    id: product.id,
    body: {
      name: product.name,
      published: true,
      published_at: new Date(),
      counter: 1
    }
  })
})


module.exports = Product
