process.env.Node_TLS_REJECT_UNATHORIZED = "0";
module.exports = {
    debug: {
        apiPort : process.env.API_PORT || 3000,
        logLevel: 'debug',
        GMendPoint: 'http://gmapi.azurewebsites.net'
    },
    test: {
        apiPort : process.env.API_PORT || 3000,
        logLevel: 'info',
        GMendPoint: 'http://gmapi.azurewebsites.net'
    },
    development: {
        apiPort : process.env.API_PORT || 3000,
        logLevel: 'debug',
        GMendPoint: 'http://gmapi.azurewebsites.net'
    },
    production: {
        apiPort : process.env.API_PORT || 3000,
        logLevel: 'info',
        GMendPoint: 'http://gmapi.azurewebsites.net'
    },
}