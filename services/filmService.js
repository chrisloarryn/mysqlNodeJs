const factoryService = require('./handlerFactoryService')
const catchAsync = require('./../utils/catchAsync')
const { FilmModel } = require('./../db/database')


exports.getAllFilmsService = factoryService.getAll(FilmModel)

exports.createFilmService = () => {
    catchAsync(async (req, res, next) => {
        let movie = { ...req.body }
        movie.createdAt = new Date()
        movie.updated = new Date()
    
        const film = await FilmModel.create(req.body)
        res.status(201).json({
          status: 'success',
          data: {
            data: film
          }
        })
      })
}