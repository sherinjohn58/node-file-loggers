require('dotenv').config({
    path: '.env'
});
const express = require('express');
const logger = require('./util/logger');
const app = express();
var config = require('./config/config');

var port = config.PORT;

app.get("/", (req, res) => {
    try {
        logger.info(`Logger Working fine`);
        res.send("test Logger");
    } catch (err) {
        logger.error(`Logger not working`);
    }
})

app.listen(port, (err, result) => {
    if (err) {
        logger.error(`Something Went Wrong`)
    } else {
        logger.info(`Server Listening at port ${port}`);
    }
})