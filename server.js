
const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  const order = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt: 'qrpass_receipt_' + Date.now()
  });
  res.json(order);
});

app.get('/success', (req, res) => {
  res.send(`<h2>Payment Successful</h2><p>Thank you for your payment, ${req.query.name}.</p>`);
});

app.listen(3000, () => {
  console.log('QRPass payment server running on port 3000');
});
