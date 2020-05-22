const router = require('express').Router()
const catchAsync = require('./../../utils/catchAsync')
const AppError = require('./../../utils/appError')
const filmController = require('../../controllers/filmController')
//const film

const { FilmModel } = require('./../../db/database')

router
    .route('/')
    .get(filmController.getAllFilms)
    .post(filmController.createFilm)

router.patch(
  '/:filmId',
  catchAsync(async (req, res, next) => {
    let cp = { ...req.body }
    cp.updatedAt = Date.now()
    const doc = await FilmModel.update(cp, {
      where: { id: req.params.filmId }
    })
    res.status(200).json({
      status: 'success',
      data: {
        data: cp
      }
    })
  })
)

router.delete(
  '/:filmId',
  catchAsync(async (req, res, next) => {
    const doc = await FilmModel.destroy({
      where: { id: req.params.filmId }
    })

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
  })
)

module.exports = router
