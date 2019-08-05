const app = require('express')()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const { UserRoutes } = require('./routes')

// APPLICATION HELPERS MIDDLEWARE
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// APPLICATION WIDE MIDDLEWARE

// ROUTES
app.use(UserRoutes)

// ERROR HANDLING
app.use((req,res, next)=>{
    throw({ status:404, code:'ROUTENOTFOUND' })
})

app.use((error, req, res, next)=>{
    console.log(error)
    res.status(error.status || 500)
    res.json(error)
})

module.exports = app