const express = require('express')
const mongoose = require('mongoose')
const routes = require('./api/routes/studentRoutes')
const { errHandler } = require('./api/middleware/errHandler')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const hostname = '127.0.0.1'
const port = 3000
const app = express()

mongoose.connect('mongodb://localhost:27017/studentsdb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})
app.use(routes)

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Student API',
      description: 'Student API Information',
      contact: {
        name: 'Alex Developer'
      },
      servers: ['http://localhost:3000']
    }
  },

  apis: ['./api/controllers/*.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(errHandler)

app.listen(port, hostname, () => {
  console.log(`Server running ${hostname} on ${port}`)
})
