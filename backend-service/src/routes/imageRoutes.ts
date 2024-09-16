import express from 'express';
import { uploadImage } from '../controllers/imageController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image processing and uploading
 */

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Uploads an image and processes it
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: The image file to upload
 *       - in: formData
 *         name: scaleFactor
 *         type: number
 *         required: false
 *         description: Scale factor for face detection (default 1.1)
 *       - in: formData
 *         name: minNeighbors
 *         type: integer
 *         required: false
 *         description: Min neighbors for face detection (default 4)
 *     responses:
 *       200:
 *         description: Returns the processed image
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/upload', uploadImage);

export default router;