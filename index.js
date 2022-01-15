require('dotenv').config();
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
import {fileTypeFromStream} from 'file-type';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const handleRecord = async (record) => {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;

    const getObjectCommand = new GetObjectCommand({
        Bucket: bucket,
        Key: key
    });

    const commandResult = await s3Client.send(getObjectCommand);
    const fileType = await fileTypeFromStream(commandResult.Body);

    console.log(fileType);

    // TODO: if not valid fileType delete the object
};

exports.handler = async (event) => {
    console.log(event);

    const response = {
        statusCode: 200,
    };

    const records = event.Records;

    try {
        for (const record of records) {
            await handleRecord(record);
        }
    } catch (error) {
        console.log(error);
        response.statusCode = 500;
    }

    return response;
};
