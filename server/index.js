// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// MEN

// E - Express

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Admin =require('./models/admin.model')
const Product =require('./models/product.model')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { GridFsStorage } = require("multer-gridfs-storage")
require("dotenv").config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/pizzastore')

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok',})
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})
// admin 
app.post('/api/adminregister', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await Admin.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})
//adminlogin
app.post('/api/adminlogin', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123admin'
		)

		return res.json({ status: 'ok', user: token,user })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

 
app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: token})



	} else {
		return res.json({ status: 'error', user: false })
	}
})


app.listen(8000, () => {
	console.log('Server started on 8000')
})

app.post('/api/products', upload.single('image'), async (req, res) => {
	try {
	  const { name, price, rating } = req.body;
	  const image = req.file ? req.file.path : ''; // Check if req.file exists
	  const newProduct = new Product({ name, price, rating, image });
	  await newProduct.save();
	  res.json({ status: 'ok', message: 'Product added successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ status: 'error', error: 'Internal server error' });
	}
  });
  app.put('/api/products/:productId', upload.single('image'), async (req, res) => {
	try {
	  const { name, price, rating } = req.body;
	  const image = req.file ? req.file.path : ''; // Check if req.file exists
	  const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, { name, price, rating, image }, { new: true });
	  if (!updatedProduct) {
		return res.status(404).json({ status: 'error', error: 'Product not found' });
	  }
	  res.json({ status: 'ok', message: 'Product updated successfully', product: updatedProduct });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ status: 'error', error: 'Internal server error' });
	}
  });
  app.delete('/api/products/:productId', async (req, res) => {
	try {
	  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
	  if (!deletedProduct) {
		return res.status(404).json({ status: 'error', error: 'Product not found' });
	  }
	  res.json({ status: 'ok', message: 'Product deleted successfully', product: deletedProduct });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ status: 'error', error: 'Internal server error' });
	}
  });
//compet add product	
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); // Retrieve all products from the database
        res.json({ status: 'ok', products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
});
 

//orderdetails
app.post('/orderdetails', async (req, res) => {
	try {
	  const { userId, products, totalPrice } = req.body;
	  const order = new Order({
		userId,
		products,
		totalPrice,
		status: 'Active' // Assuming 'Active' status for new orders
	  });
	  const savedOrder = await order.save();
	  res.json(savedOrder);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  
  // GET route to fetch all orders
  app.get('/getorderdetails', async (req, res) => {
	try {
	  const orders = await Order.find();
	  res.json(orders);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  
  // PUT route to cancel an order
  app.put('/cancelorder/:orderId', async (req, res) => {
	try {
	  const { orderId } = req.params;
	  const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' }, { new: true });
	  if (!updatedOrder) {
		return res.status(404).json({ message: 'Order not found' });
	  }
	  res.json(updatedOrder);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  
  

  
