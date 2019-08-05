const { APP_PORT } = require('./config')
const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const port = APP_PORT || 8000

server.listen(port, ()=>{
    console.log(`listening on port: ${port}`)
})