const AWS = require("aws-sdk");

AWS.config.region = process.env.AWS_REGION;
let sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

exports.handler = async (event, context) => {
  console.log("Starting lambda");
  try {
    // Params object for SQS
    const params = {
      MessageBody: `Message at ${Date()}`,
      QueueUrl: process.env.SQSqueueName,
    };
    console.log("Calling send message", JSON.stringify(params));
    console.log("test", JSON.stringify(process.env));
    const result = await sqs
      .sendMessage(params, async function (err, data) {
        console.log("Finished?");
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.MessageId);
        }
      })
      .promise();
    console.log("Result", result);
  } catch (error) {
    console.error(JSON.stringify(error));
    throw error;
  }
};
