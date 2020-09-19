'use strict';

module.exports = app => {
    const smartcarController = require('../controllers/smartcarAPIController')
    app.get("/healthcheck-basic", smartcarController.healthcheck)
    app.get("/vehicles/:id", smartcarController.getVehicleInfo)
}