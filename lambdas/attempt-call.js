const AWS = require("aws-sdk");

AWS.config.region = process.env.AWS_REGION;
let sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.handler = async (event, context) => {
  try {
    const myNumber = getRandomInt(10);

    const myBody = {
      message: `Message at ${Date()}`,
      value: myNumber,
    };

    const params = {
      MessageBody: JSON.stringify(myBody),
      QueueUrl: process.env.SQSqueueName,
      MessageGroupId: "sqs-dead-letter-example", // Necessary for fifo queues
    };

    const result = await sqs
      .sendMessage(params, async function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.MessageId);
        }
      })
      .promise();

    return myNumber;
  } catch (error) {
    console.error(JSON.stringify(error));
    throw error;
  }
};
