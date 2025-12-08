import { S3Client } from "@aws-sdk/client-s3";

// configura e exporta o cliente S3 para fazer upload das imagens no AWS S3
export const S3Config = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});