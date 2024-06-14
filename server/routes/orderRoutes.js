// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orders.model')

// POST route to create a new order
router.post('/orderdetails', async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;
    const order = new Order({
      userId,
      products,
      totalPrice
    });
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch all orders
router.get('/getorderdetails', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
