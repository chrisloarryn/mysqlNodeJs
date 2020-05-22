const Sequelize = require('sequelize')
// Import DB configs
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env
// Import models
const filmModel = require('./../models/filmModel')
const userModel = require('./../models/userModel')

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: 'mysql'
})

const FilmModel = filmModel(sequelize, Sequelize)
const UserModel = userModel(sequelize, Sequelize)

sequelize.sync({ force: false }).then(() => {
  console.log('sync development exits')
})
module.exports = { FilmModel, UserModel }
