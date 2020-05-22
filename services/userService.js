const factoryService = require('./handlerFactoryService')

exports.getAllUsersService = (Model) => factoryService.getAll(Model)