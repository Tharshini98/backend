const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db.js');


const getRouter = (mod) => (mod.default ? mod.default : mod);


const authRoutes = getRouter(require('./routes/auth.routes.js'));
const productRoutes = getRouter(require('./routes/product.routes.js'));
const cartRoutes = getRouter(require('./routes/cart.routes.js'));
const orderRoutes = getRouter(require('./routes/order.routes.js'));
const paymentRoutes = getRouter(require('./routes/payment.routes.js'));
const sellerRoutes = getRouter(require('./routes/seller.routes.js')); 
const userRoutes = require('./routes/user.routes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    'https://whimsical-sfogliatella-3cfab2.netlify.app',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/seller', sellerRoutes); 
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
