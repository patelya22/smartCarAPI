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
    const response = {}
    axios
        .post(config.GMendPoint, optionData)
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