const express = require('express')
const router = express.Router()

const tourController = require('../controller/tourController')

router.route('/')
    .post(tourController.checkBody, tourController.createTour)
    .get(tourController.getAllTours)

router.route('/:id')
    .patch(tourController.updateTourById)
    .delete(tourController.deleteTourById)
    .get(tourController.getTourById)

module.exports = router