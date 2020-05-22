const userService = require('../services/userService')

exports.getAllUsers = (Model) => userService.getAllUsersService(Model)