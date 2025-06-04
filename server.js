const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./docs/swagger');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const colorRoutes = require('./routes/colorRoutes');
const brandRoutes = require('./routes/brandRoutes');
const bannerRoutes = require('./routes/bannerRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
// Increase limit to 50mb or more, as needed
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/Categories',categoryRoutes);
app.use('/api/colors',colorRoutes);
app.use('/api/brands',brandRoutes);
app.use('/api/banners',bannerRoutes);
app.use('/uploads/products', express.static('uploads/products'));
app.use('/uploads/categories', express.static('uploads/categories'));
app.use('/uploads/brands',express.static('uploads/brands'));
app.use('/uploads/banners',express.static('uploads/banners'));
swaggerDocs(app);

// handle the error when none of the above routes works
app.use(errorHandler);



app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
