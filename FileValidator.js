const { S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { fromStream } = require('file-type');

class FileValidator {
	static get STL_FILE_TYPE() { return 'stl' };

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
		const fileType = await fromStream(commandResult.Body);

		if (!fileType || fileType.ext !== this.STL_FILE_TYPE) {
			console.log('Invalid file type uploaded');
			console.log(fileType);

			const deleteObjectCommand = new DeleteObjectCommand({
				Bucket: bucket,
				Key: key	
			});

			await this.#s3Client.send(deleteObjectCommand);
		}
		else {
			console.log('File is valid ASCII stl');
		}
	};
}

module.exports = FileValidator;