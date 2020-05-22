const authService = require('./../services/authService')

exports.signup = (Model) => authService.signupUser(Model)