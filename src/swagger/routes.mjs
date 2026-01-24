/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 *   - name: Expenses
 *     description: Expense management
 *   - name: Budgets
 *     description: Budget management
 *   - name: Recurring
 *     description: Recurring transaction management
 *   - name: Forecast
 *     description: Budget forecasting
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses with pagination
 *     tags: [Expenses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page (max 100)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter from date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter to date
 *     responses:
 *       200:
 *         description: List of expenses with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expenses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Expense'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, category, date, description]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *                 example: Dinner at restaurant
 *     responses:
 *       201:
 *         description: Expense created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Expense updated
 *       404:
 *         description: Expense not found
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted
 *       404:
 *         description: Expense not found
 */

/**
 * @swagger
 * /expenses/analytics:
 *   get:
 *     summary: Get expense analytics
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Category and monthly statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryStats:
 *                   type: array
 *                   items:
 *                     type: object
 *                 monthlyStats:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /budgets:
 *   get:
 *     summary: Get user budgets
 *     tags: [Budgets]
 *     responses:
 *       200:
 *         description: List of budgets
 *   post:
 *     summary: Create or update a budget
 *     tags: [Budgets]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [category, amount, period]
 *             properties:
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               period:
 *                 type: string
 *                 enum: [daily, weekly, monthly, annually]
 *     responses:
 *       200:
 *         description: Budget saved
 */

/**
 * @swagger
 * /recurring:
 *   get:
 *     summary: Get all recurring transactions
 *     tags: [Recurring]
 *     responses:
 *       200:
 *         description: List of recurring transactions
 *   post:
 *     summary: Create a recurring transaction
 *     tags: [Recurring]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, category, frequency]
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly, yearly]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recurring transaction created
 */

/**
 * @swagger
 * /recurring/{id}:
 *   put:
 *     summary: Update recurring transaction
 *     tags: [Recurring]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete recurring transaction
 *     tags: [Recurring]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */

/**
 * @swagger
 * /recurring/{id}/toggle:
 *   patch:
 *     summary: Toggle recurring transaction active state
 *     tags: [Recurring]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Toggled
 */

/**
 * @swagger
 * /forecast:
 *   get:
 *     summary: Get budget forecast
 *     tags: [Forecast]
 *     responses:
 *       200:
 *         description: Predicted spending vs budget
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 predictedTotal:
 *                   type: number
 *                 budgetLimit:
 *                   type: number
 *                 status:
 *                   type: string
 *                   enum: [On Track, Danger]
 */
