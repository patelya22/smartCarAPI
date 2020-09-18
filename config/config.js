process.env.Node_TLS_REJECT_UNATHORIZED = "0";
module.exports = {
    debug: {
        api_port : process.env.API_PORT || 3000,
    },
    test: {
        api_port : process.env.API_PORT || 3000,
    },
    development: {
        api_port : process.env.API_PORT || 3000,
    },
    debug: {
        api_port : process.env.API_PORT || 3000,
    },
}