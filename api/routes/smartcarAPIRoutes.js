'use strict';
const express = require("express")
module.exports = app => {
    const smartcarController = require('../controllers/smartcarAPIController')
    app.get("/healthcheck-basic", smartcarController.healthcheck)
    app.get("/vehicles/:id", smartcarController.getVehicleInfo)
    app.get("/vehicles/:id/doors", smartcarController.getVehicleSecurity)
    app.get("/vehicles/:id/fuel", smartcarController.getVehicleFuel)
    app.get("/vehicles/:id/battery", smartcarController.getVehicleFuel)
    app.post("/vehicles/:id/engine", smartcarController.vehicleStartStop)
}