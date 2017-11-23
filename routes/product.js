const Router = require('koa-router')
const router = new Router({ prefix: '/api/products' })
const Product = require('../db/model/product')

router.get('/:id?', async (ctx, next) => {
  let id = ctx.params.id
  ctx.body = id ? await Product.findById(id) : await Product.findAll()
})

router.post('/', async (ctx, next) => {
  let product = ctx.request.body
  await Product.create(product)
  ctx.body = {}
})

router.put('/', async (ctx, next) => {
  let product = ctx.request.body
  let productFound = await Product.findById(product.id)
  productFound.update(product)
  ctx.body = {}
})

router.delete('/:id', async (ctx, next) => {
  let id = ctx.params.id
  let productFound = await Product.findById(id)
  productFound.destroy()
  ctx.body = {}
})


module.exports = router
