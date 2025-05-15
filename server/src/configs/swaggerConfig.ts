import { SwaggerOptions } from "swagger-ui-express";

export const swaggerConfig: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crypto Watcher API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'],
};
