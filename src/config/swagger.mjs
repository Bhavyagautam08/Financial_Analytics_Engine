import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense Tracker API',
            version: '1.0.0',
            description: 'A comprehensive API for tracking expenses, managing budgets, and handling recurring transactions.',
            contact: {
                name: 'Developer',
                email: 'developer@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token'
                }
            },
            schemas: {
                Expense: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', description: 'Unique identifier' },
                        amount: { type: 'number', description: 'Expense amount' },
                        category: { type: 'string', description: 'Expense category' },
                        date: { type: 'string', format: 'date', description: 'Expense date' },
                        description: { type: 'string', description: 'Expense description' },
                        userId: { type: 'string', description: 'User ID' }
                    }
                },
                Budget: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        amount: { type: 'number' },
                        category: { type: 'string' },
                        period: { type: 'string', enum: ['daily', 'weekly', 'monthly', 'annually'] }
                    }
                },
                RecurringTransaction: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        amount: { type: 'number' },
                        category: { type: 'string' },
                        frequency: { type: 'string', enum: ['daily', 'weekly', 'monthly', 'yearly'] },
                        isActive: { type: 'boolean' },
                        nextRunDate: { type: 'string', format: 'date-time' }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        avatar: { type: 'string' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                Pagination: {
                    type: 'object',
                    properties: {
                        currentPage: { type: 'integer' },
                        totalPages: { type: 'integer' },
                        totalItems: { type: 'integer' },
                        itemsPerPage: { type: 'integer' },
                        hasNextPage: { type: 'boolean' },
                        hasPrevPage: { type: 'boolean' }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: [
        './src/routes/*.mjs',
        './src/swagger/*.mjs'  // We'll put detailed docs here
    ]
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export { swaggerUi };
