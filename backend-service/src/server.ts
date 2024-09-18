import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';
import imageRoutes from './routes/imageRoutes';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { logger } from './utils/logger';

dotenv.config();

const app: Application = express();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://demo.neolink.cl'],
    methods: ['GET', 'POST'],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit of 100 requests per window per IP
});
app.use(limiter);

// Body parser
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Backend Service API',
      version: '1.0.0',
      description: 'API documentation for the backend service',
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 5000}` }],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount routes
app.use('/api/images', imageRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Backend service is healthy' });
});

// Error handling middleware (should be after all routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Backend service running on port ${PORT}`);
});