const Koa = require("koa")
const koaBody = require('koa-body')
const logger = require('koa-logger')
const config = require("config")
const cors = require('koa-cors')
const productRoute = require('./routes/product')
require('./db/init.js')

function start() {
  const app = new Koa()
  app.use(cors())
  app.use(logger())
  app.use(koaBody())
  app.use(productRoute.routes())
  app.use(productRoute.allowedMethods())

  let port = config.get("bind_port")
  app.listen(port)
  console.log(`Koa listening on ${port} ...`)
}

start()

