process.env.NODE_TLS_REFECT_UNAUTHORIZED = '0'
var env = process.env.NODE_ENV || 'development'

const config = require('./config/config')[env]
const { createLogger, transports, format } = require("winston");

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
    logger = createLogger({
        level: config.logLevel,
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
          ),
          transports: [
            new transports.File({
              filename: './logs/athena-facade.log',
              json: false,
              maxsize: 5242880,
              maxFiles: 5,
            }),
            new transports.Console(),
          ]
    });
port = config.apiPort;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("./api/routes/smartcarAPIRoutes")(app);
app.listen(port);


logger.info("API server started on: " + port);
module.exports = app; // for testing