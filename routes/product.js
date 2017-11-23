const Router = require('koa-router')
const router = new Router({ prefix: '/api/products' })
const Product = require('../db/model/product')

router.get('/', async (ctx, next) => {
  let products = await Product.findAll()
  ctx.body = products
})

module.exports = router
