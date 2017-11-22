const Koa = require("koa")
const {createKoaServer} = require("routing-controllers")
const config = require("config")
require('./db/db.js')

async function init() {
  const app = createKoaServer({
    development: config.get("debug_logging"),
    controllers: (config.get("controllers")).map(item => {
      return `${__dirname}/${item}`
    }),
  })

  return app
}

async function start() {
  let app = await init()
  let port = config.get("bind_port")
  app.listen(port)
  console.log(`Koa listening on ${port} ...`)
}

start()

