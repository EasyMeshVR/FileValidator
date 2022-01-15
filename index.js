require('dotenv').config();

exports.handler = async (event) => {
    console.log(event);
    console.log(event.userIdentity);
    console.log(event.requestParameters);
    console.log(event.responseElements);
    console.log(event.s3);

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
