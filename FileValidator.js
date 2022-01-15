import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fileTypeFromStream } from "file-type"; 'file-type';

export class FileValidator {
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
		const fileType = await fileTypeFromStream(commandResult.Body);

		console.log(fileType);

		// TODO: if not valid fileType delete the object
	};
}