require('dotenv').config();
const FileValidator = require('./FileValidator.js');

exports.handler = async (event) => {
    console.log(event);

    const response = {
        statusCode: 200,
    };

    const records = event.Records;

    try {
        for (const record of records) {
            await FileValidator.handleRecord(record);
        }
    } catch (error) {
        console.log(error);
        response.statusCode = 500;
    }

    return response;
};
