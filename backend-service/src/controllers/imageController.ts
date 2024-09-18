import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { validationResult, check } from 'express-validator';
import { logger } from '../utils/logger';

const upload = multer();

// Middleware for input validation
const validateInputs = [
  check('scaleFactor')
    .optional()
    .isFloat({ min: 1.0, max: 2.0 })
    .withMessage('scaleFactor must be between 1.0 and 2.0'),
  check('minNeighbors')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('minNeighbors must be between 1 and 10'),
];

export const uploadImage = [
  upload.single('image'),
  ...validateInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.warn('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.file) {
        logger.warn('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { scaleFactor, minNeighbors } = req.body;

      const formData = new FormData();
      formData.append('image', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });

      // Append parameters if they exist (matching FastAPI param names)
      if (scaleFactor) formData.append('scale_factor', scaleFactor);
      if (minNeighbors) formData.append('min_neighbors', minNeighbors);

      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        body: formData as any,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ML Service Error: ${errorText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(Buffer.from(arrayBuffer));
    } catch (error: any) {
      logger.error('Error in uploadImage:', error.message);
      next(error);
    }
  },
];