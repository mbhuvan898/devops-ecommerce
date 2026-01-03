const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

/**
 * S3 client
 * Uses IAM Role on EC2 / ECS
 * No access keys in code
 */
const s3 = new S3Client({
    region: process.env.AWS_REGION,
});

/**
 * Upload file to S3
 * @param {Object} file - multer file object
 * @param {String} folder - s3 folder name
 */
const uploadToS3 = async (file, folder = "products") => {
    if (!file) {
        throw new Error("No file provided to uploadToS3");
    }

    const key = `${folder}/${uuidv4()}-${file.originalname}`;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    await s3.send(command);

    return {
        public_id: key,
        url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    };
};

/**
 * ✅ THIS LINE IS CRITICAL
 * Must export an object
 */
module.exports = { uploadToS3 };
