import multer from "multer";
import multerS3 from "multer-s3";
import { S3Config } from "../utils/S3Config.js";

// middleware responsável por receber o arquivo e enviar para o S3
export const upload = multer({
    storage: multerS3({
        s3: S3Config, // cliente S3 configurado
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callabck) => {
            // define o nome com pasta + timestamp
            const fileName = `filme/${Date.now()}-${file.originalname}`;
            callabck(null, fileName)
        },
    }),
})