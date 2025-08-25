const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const connectDB = require('./config/db');


const app = express();

//Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const whishlistRoutes = require("./routes/whishlistRoutes")
 

//_---------------------------DB CONNETION----------------------//

// Connect to DB
connectDB();

//------------------------------CORESSS----------------------------------//

// CORS - MUST be before routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//-----------------------------middleware--------------------------//

// Middleware
app.use(express.json());
app.use(cookieParser());

//-------------------------- --------------------------------//

//whishlistRoutes
app.use("/api/wishlist",whishlistRoutes)

//cart Routes
app.use("/api/cart",cartRoutes)

// Auth Routes
app.use('/api/auth', authRoutes);

// Products Routes
app.use("/api/products",productRoutes)

//---------------------------SERVR CONNECTION-----------------//

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
