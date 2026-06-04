const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Q3 Admin API',
      version: '1.0.0',
      description: 'Complete API documentation for Q3 Fleet Management System',
      contact: {
        name: 'Q3 Support',
        email: 'admin@q3.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token. Get it from POST /api/auth/login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@q3.com' },
            role: {
              type: 'string',
              enum: ['admin', 'subadmin', 'employee', 'driver'],
              example: 'employee',
            },
            is_active: { type: 'boolean', example: true },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Driver: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            user_id: { type: 'integer', example: 3 },
            name: { type: 'string', example: 'Ravi Kumar' },
            email: { type: 'string', example: 'ravi@q3.com' },
            license_number: { type: 'string', example: 'DL1234567890' },
            phone: { type: 'string', example: '9876543210' },
            is_available: { type: 'boolean', example: true },
          },
        },
        Cab: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            cab_number: { type: 'string', example: 'DL01AB1234' },
            model: { type: 'string', example: 'Swift Dzire' },
            driver_id: { type: 'integer', example: 1, nullable: true },
            driver_name: { type: 'string', example: 'Ravi Kumar', nullable: true },
            is_active: { type: 'boolean', example: true },
          },
        },
        Location: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Delhi Airport' },
            latitude: { type: 'number', format: 'float', example: 28.5562 },
            longitude: { type: 'number', format: 'float', example: 77.1000 },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@q3.com' },
            password: { type: 'string', example: 'admin123' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Login successful' },
            data: {
              type: 'object',
              properties: {
                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                user: { '$ref': '#/components/schemas/User' },
              },
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message here' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Authentication and account management' },
      { name: 'Users', description: 'User management — admin and subadmin only' },
      { name: 'Drivers', description: 'Driver management — admin and subadmin only' },
      { name: 'Cabs', description: 'Cab management — all roles can view' },
      { name: 'Locations', description: 'Location management — all roles can view' },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);