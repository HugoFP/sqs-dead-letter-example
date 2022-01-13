const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  console.log("Event received", JSON.stringify(event));

  for await (const record of event.Records) {
    const recordBody = JSON.parse(record.body);
    if (recordBody.value % 2 === 0) {
      throw Error(`Fail because value: ${recordBody.value}`);
    } else {
      console.log(`Success for value: ${recordBody.value}`);
    }
  }
};
