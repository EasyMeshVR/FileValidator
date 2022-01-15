const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { fromStream } = require('file-type');

class FileValidator {
	static #s3Client = new S3Client({ 
		region: process.env.AWS_REGION 
	});

	static handleRecord = async (record) => {
		const bucket = record.s3.bucket.name;
		const key = record.s3.object.key;

		const getObjectCommand = new GetObjectCommand({
			Bucket: bucket,
			Key: key
		});

		const commandResult = await this.#s3Client.send(getObjectCommand);
		console.log(typeof(commandResult.Body));
		const fileType = await fromStream(commandResult.Body);

		console.log(fileType);

		// TODO: if not valid fileType delete the object
	};
}

module.exports = FileValidator;