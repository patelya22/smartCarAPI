var env = process.env.NODE_ENV || 'development'
const config = require('../../config/config')[env]
const axios = require('axios')

function ErrorHandler(res, errorCode, errorMessage){
    logger.error(errorMessage);
    res.status(errorCode);
    res.json({message: errorMessage});
}
// checking the health of the api
exports.healthcheck = (req, res) => {
    logger.debug("GETTING THE HEALTHCHECK")
    res.status(200).send({message: "success"})
};

// getting the vehicle info
exports.getVehicleInfo = (req, res) => {
    const vehicleID = req.params.id;
    const optionData = {
        "id" : vehicleID,
        "responseType" : "JSON"
    }
    logger.debug("GETTING THE VEHICLE INFO")
    var response = {}
    axios
        .post(config.GMendPoint + "/getVehicleInfoService", optionData)
        .then(result => {
            if (result.data.status == '404'){
                ErrorHandler(res, result.data.status, result.data.reason)
            }
            else if (result.data.status != '200'){
                ErrorHandler(res, result.data.status, "Unable to get the response from GM")
            }
            else {
                var responseData = result.data.data;
                response["vin"] = responseData.vin.value;
                response["color"] = responseData.color.value;
                response["doorCount"] = responseData.fourDoorSedan.value == "True" ? 4 : 2;
                response["driveTrain"] = responseData.driveTrain.value;
                res.status(200).send(response);
            }
        })
        .catch(error => {
            ErrorHandler(res, 500 , "Internal Server Error")
        })

    const options = {

    }
};

// getting the security info for vehicle
exports.getVehicleSecurity = (req, res) => {
    const vehicleID = req.params.id;
    logger.debug("GETTING THE VEHICLE SECURITY")
    const optionData = {
        "id" : vehicleID,
        "responseType" : "JSON"
    }
    var response = []
    axios
        .post(config.GMendPoint + "/getSecurityStatusService", optionData)
        .then(result => {
            if (result.data.status == '404'){
                ErrorHandler(res, result.data.status, result.data.reason)
            }
            else if (result.data.status != '200'){
                ErrorHandler(res, result.data.status, "Unable to get the response from GM")
            }
            else {
                var responseData = result.data.data.doors.values;
                responseData.forEach(data => {
                    var doorInfo = {}
                    doorInfo["location"] = data.location.value
                    doorInfo["locked"] = data.locked.value == "True" ? true : false;
                    response.push(doorInfo)
                });
                logger.debug("GOT THE SECURITY INFO FOR", vehicleID)
                res.status(200).send(response);
            }
        })
};

// getting the fuel info for vehicle
exports.getVehicleFuel = (req, res) => {
    var fuelOrBattery = req.originalUrl.split("/");
    fuelOrBattery = fuelOrBattery[fuelOrBattery.length - 1]
    const vehicleID = req.params.id;
    logger.debug("GETTING THE VEHICLE FUEL")
    const optionData = {
        "id" : vehicleID,
        "responseType" : "JSON"
    }
    var response = {}
    axios
        .post(config.GMendPoint + "/getEnergyService", optionData)
        .then(result => {
            if (result.data.status == '404'){
                ErrorHandler(res, result.data.status, result.data.reason)
            }
            else if (result.data.status != '200'){
                ErrorHandler(res, result.data.status, "Unable to get the response from GM")
            }
            else {
                var responseData = result.data.data;
                if (fuelOrBattery === "fuel"){
                    if (parseFloat(responseData.tankLevel.value)){
                        response["percent"] = parseFloat(responseData.tankLevel.value);
                        res.status(200)
                    }
                    else{
                        response["Message"] = "THIS IS AN ELECTRIC CAR. PLEASE TRY BELOW ENDPOINT"
                        response["endpoint"] = `http://${req.headers.host}/vehicles/${vehicleID}/battery`
                        res.status(400)
                    }
                    logger.debug("GOT THE FUEL INFO FOR", vehicleID)
                } else {
                    if (parseFloat(responseData.batteryLevel.value)){
                        response["percent"] = parseFloat(responseData.batteryLevel.value)
                        res.status(200)
                    }
                    else{
                        response["Message"] = "THIS IS AN NON-ELECTRIC CAR. PLEASE TRY BELOW ENDPOINT"
                        response["endpoint"] = `http://${req.headers.host}/vehicles/${vehicleID}/fuel`
                        res.status(400)
                    }
                    logger.debug("GOT THE BATTERY INFO FOR", vehicleID)
                }
                res.send(response);
            }
        })
}

// starting the engine
exports.vehicleStartStop = (req, res) => {
    const vehicleID = req.params.id;
    const action = req.body.action;
    if (action == undefined || action.length == 0) {
        ErrorHandler(res, 400, "MISSING DATA PLEASE PASS DATA")
    }
    else {
        if (action != "START" && action != "STOP"){
            ErrorHandler(res, 400, "INVALID ACTION PASSED. VALID ACTION 'START' OR 'STOP'")
        }
        else {
            var response = {}
            const optionData = {
                "id" : vehicleID,
                "command" : `${action}_VEHICLE`,
                "responseType" : "JSON"
            }
            axios
                .post(`${config.GMendPoint}/actionEngineService`, optionData)
                .then(result => {
                    if (result.data.status == '404'){
                        ErrorHandler(res, result.data.status, result.data.reason)
                    }
                    else if (result.data.status != '200'){
                        ErrorHandler(res, result.data.status, "Unable to get the response from GM")
                    }
                    else {
                        var responseData = result.data.actionResult.status;
                        response["status"] = responseData == "EXECUTED" ? "success" : "error"
                        res.status(200).send(response)
                    }
                })
        }
    }
}