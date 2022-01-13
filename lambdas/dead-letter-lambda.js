const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  console.log("Event from dead letter queue", JSON.stringify(event));
};
