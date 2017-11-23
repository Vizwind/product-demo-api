const Router = require('koa-router')
const router = new Router({prefix: '/api/products'})
const Product = require('../db/model/product')
const elastic = require('../elastic/client')

router.get('/:id?', async (ctx, next) => {
  try {
    let id = ctx.params.id
    ctx.body = id ? await Product.findById(id) : await Product.findAll()
  } catch (ex) {
    console.error(ex)
    ctx.response.status = 400
    ctx.body = {
      errors: [ ex.message ]
    }
  }
})

router.post('/', async (ctx, next) => {
  try {
    let product = ctx.request.body
    await Product.create(product)
    ctx.body = {}
  } catch (ex) {
    console.error(ex)
    ctx.response.status = 400
    ctx.body = {
      errors: [ ex.message ]
    }
  }
})

router.put('/', async (ctx, next) => {
  try {
    let product = ctx.request.body
    let productFound = await Product.findById(product.id)
    await productFound.update(product)
    ctx.body = {}
  } catch (ex) {
    console.error(ex)
    ctx.response.status = 400
    ctx.body = {
      errors: [ex.message]
    }
  }
})

router.delete('/:id', async (ctx, next) => {
  try {
    let id = ctx.params.id
    let productFound = await Product.findById(id)
    await productFound.destroy()
    ctx.body = {}
  } catch (ex) {
    console.error(ex)
    ctx.response.status = 400
    ctx.body = {
      errors: [ex.message]
    }
  }
})

router.get('/search/:searchQuery', async (ctx, next) => {
  try {
    let searchQuery = ctx.params.searchQuery
    let resp = await elastic.search({
      index: 'product',
      type: 'doc',
      body: {
        size: 100,
        query: {
          "bool": {
            "should": [
              { "wildcard":
                { "name": {
                  value: `*${searchQuery}*`,
                  boost: 2 }
                }
              },
              { "wildcard": { "description": `*${searchQuery}*` } }
            ]
          }
        }
      }
    })
    ctx.body = resp.hits.hits
  } catch (err) {
    console.error(err)
    if(err.status === 404) {
      ctx.body = {}
      return
    }
    ctx.response.status = 400
    ctx.body = {
      errors: [ err.message ]
    }
  }
})


module.exports = router
