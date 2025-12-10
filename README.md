# Financial Analyser

A modern Single Page Application (SPA) for tracking and analyzing personal finances. Built with React frontend and Node.js/Express backend.

## Features

- 📊 **Dashboard**: Overview of financial status with charts and statistics
- 💰 **Transaction Management**: Add, edit, and delete income/expense transactions
- 📈 **Analytics**: Detailed breakdowns by category and monthly trends
- 🎨 **Interactive Charts**: Visual representation of financial data using Recharts
- 🔍 **Filtering**: Filter transactions by type, category, and date range

## Tech Stack

### Backend
- Node.js & Express
- RESTful API architecture
- In-memory data storage (easily replaceable with a database)

### Frontend
- React 18
- Vite for fast development
- React Router for navigation
- Recharts for data visualization
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/PricyEgg95/financial-analyser.git
cd financial-analyser
```

2. Install backend dependencies
```bash
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

### Running the Application

#### Option 1: Run backend and frontend separately

1. Start the backend server (in the root directory):
```bash
npm run server
```
The backend API will run on http://localhost:3001

2. Start the frontend (in a new terminal):
```bash
npm run client
```
The frontend will run on http://localhost:5173

#### Option 2: Development mode (backend only)
```bash
npm run dev
```

### API Endpoints

#### Transactions
- `GET /api/transactions` - Get all transactions (supports filtering)
- `GET /api/transactions/:id` - Get a specific transaction
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

#### Analytics
- `GET /api/analytics/summary` - Get financial summary
- `GET /api/analytics/category-breakdown` - Get breakdown by category
- `GET /api/analytics/monthly-trends` - Get monthly trends
- `GET /api/analytics/recent` - Get recent transactions

### Project Structure

```
financial-analyser/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── server.js         # Express server setup
├── frontend/
│   ├── public/           # Static assets
│   └── src/
│       ├── components/   # React components
│       │   ├── Dashboard/
│       │   ├── Transactions/
│       │   └── Analytics/
│       ├── services/     # API service layer
│       ├── App.jsx       # Main app component
│       └── main.jsx      # Entry point
├── package.json          # Backend dependencies
└── README.md
```

## Usage

1. **Dashboard**: View your financial overview including total income, expenses, balance, and recent transactions.

2. **Transactions**: 
   - Click "Add Transaction" to create a new income or expense record
   - Edit or delete existing transactions using the action buttons
   - Filter transactions by type or category

3. **Analytics**: 
   - View pie charts showing income and expense distribution by category
   - Analyze monthly trends with bar charts
   - Track your financial progress over time

## Future Enhancements

- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] User authentication and authorization
- [ ] Budget planning and alerts
- [ ] Export data to CSV/PDF
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Mobile responsive improvements
- [ ] Dark mode theme

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
