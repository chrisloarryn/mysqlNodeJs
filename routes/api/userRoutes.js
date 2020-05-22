const router = require('express').Router()
const catchAsync = require('./../../utils/catchAsync')
const AppError = require('./../../utils/appError')
const userController = require('./../../controllers/userController')
const authController = require('./../../controllers/authController')
// const film

const { UserModel } = require('./../../db/database')


router.route('/signup').post(authController.signup)


router.route('/').get(userController.getAllUsers(UserModel))


module.exports = router
