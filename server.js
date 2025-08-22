const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to DB
connectDB();

// CORS - MUST be before routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use(cookieParser());



// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
