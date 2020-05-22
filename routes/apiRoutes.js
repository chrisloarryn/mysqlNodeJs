const router = require('express').Router()

const apiFilmsRouter = require('./api/filmRoutes')
const apiUsersRouter = require('./api/userRoutes')

router.use('/films', apiFilmsRouter)
router.use('/users', apiUsersRouter)

module.exports = router