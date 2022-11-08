const logger = require("../util/logger");
var config = {};
var updateEnv = [];

/**
 * Port Configuration
 */

config.PORT = process.env.PORT;

trimmer(config);

if (updateEnv.length > 0) {
  logger.error(
    `****************** update the folloing env variable **************`
  );
  logger.error(updateEnv);
  logger.error(
    `****************** update the folloing env variable **************`
  );
  process.exit(1);
}

module.exports = config;

function trimmer(obj) {
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] == "object") {
      trimmer(obj[item]);
    } else if (typeof obj[item] == "string") {
      obj[item] = obj[item].trim();
    }
    if (obj[item] == undefined || obj[item] == null || !obj[item]) {
      updateEnv.push(item);
    }
  });
}