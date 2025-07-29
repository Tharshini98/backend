const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.routes.js');
const productRoutes = require('./routes/product.routes.js');
const cartRoutes = require('./routes/cart.routes.js');
const orderRoutes = require('./routes/order.routes.js');
const paymentRoutes = require('./routes/payment.routes.js');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
