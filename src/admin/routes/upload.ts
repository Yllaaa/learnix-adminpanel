import express, { Request } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.DIGITAL_OCEAN_SPACES_ENDPOINT as string),
  accessKeyId: process.env.DIGITAL_OCEAN_SPACES_ACCESS_KEY,
  secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET_KEY,
  region: process.env.DIGITAL_OCEAN_SPACES_REGION,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.mimetype.match(/^(image\/jpeg|image\/png|image\/jpg|image\/webp)$/)) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

interface UploadResponse {
  url: string;
}

router.post(
  '/upload/image',
  upload.single('file'),
  async (req: MulterRequest, res: express.Response<UploadResponse | { error: string }>) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
      const { buffer, originalname, mimetype } = req.file;
      const fileName = `${Date.now()}-${originalname.replace(/\s+/g, '-')}`;

      const params = {
        Bucket: process.env.DIGITAL_OCEAN_SPACES_BUCKET_NAME,
        Key: `learnix/${fileName}`,
        Body: buffer,
        ContentType: mimetype,
        ACL: 'public-read',
      };

      const uploadResult = await s3.upload(params).promise();

      return res.json({
        url: uploadResult.Location,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      return res.status(500).json({ error: error.message || 'Upload failed' });
    }
  }
);

export default router;
