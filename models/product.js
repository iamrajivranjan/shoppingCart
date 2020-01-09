var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	imagePath : {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);