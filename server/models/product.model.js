const mongoose = require('mongoose')

const Product = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true, },
		rating: { type: Number, required: true },
		Image: { type: String },
	},
	{ collection: 'Product-data' }
)

const model = mongoose.model('Product', Product)

module.exports = model
