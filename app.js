const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const rateLimit = require('express-rate-limit')
const compression = require('compression')
const morgan = require('morgan')
const xss = require('xss-clean')
const helmet = require('helmet')
const cors = require('cors')

const AppError = require('./utils/appError')
const apiRouter = require('./routes/apiRoutes')
const globalErrorHandler = require('./controllers/errorController')

// /api/v1
const service = '/api'
const version = '/v1'

// Start express app
const app = express()

// 1) GLOBAL MIDDLEWARE - Implement CORS
app.use(cors())
// Access-Control-Allow-Origin
// api.natours.com 'https://www.natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors())
// app.options('/api/v1/tours/:id', cors())

// Set security HTTP headers
app.use(helmet())

// Development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour to milliseconds
  message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api', limiter)

// Data sanitization against XXS (cross site scripting attacks)
app.use(xss())

// Sync db
require('./db/database')

app.use(compression())

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    // console.log(req.cookies);
    next()
})

// Set as Json
app.use(bodyParser.json({ limit: '10kb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }))
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// 2) ROUTES
app.use(`${service}${version}`, apiRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
