const Product = require('../models/product');

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/shopping");

const products = [
	new Product({
		imagePath: '/images/drum.jpg',
		title: 'SH Drum 1200Vsi',
		description: ' Best Drum , 5 set of band , 2 paddle, 4 stick, 6 month warranty',
		price: 300
	}),
	new Product({
		imagePath: '/images/banjo.jpg',
		title: 'SH Banjo ci1577',
		description: ' New Banjo, 4 wire, one finger wrapper 6 month warranty',
		price: 299
	}),
	new Product({
		imagePath: '/images/flute.jpg',
		title: 'C# Flute SH ',
		description: '6 holes , 12 months warrenty , c#, for beginners as well as professionals',
		price: 99.99
	}),
	new Product({
		imagePath: '/images/guitar.jpg',
		title: 'SH 3400 Acoustic Guitar',
		description: '10 extra strings , volume control , pitch control 12 months warranty',
		price: 500
	}),
	new Product({
		imagePath: '/images/piano.jpg',
		title: 'N98 DTSI 4500 Piano',
		description: '100 keys , for beginners as well as professionals, 12 months warranty',
		price: 800
	}),
	new Product({
		imagePath: '/images/suitar.jpg',
		title: 'Melody Sitar',
		description: '10 extra string , for beginners as well as professionals, 12 months warranty',
		price: 499
	}),
	new Product({
		imagePath: '/images/tabla.jpg',
		title: 'Goblu Tabla',
		description: '3 set, for beginners as well as professionals, 12 months warranty',
		price: 599
	}),
	
];

var done = 0;

for ( var i = 0; i< products.length; i++){
	products[i].save(function(err, result){
		done++;
		if(done === products.length){
			exit();
		}
	});
}

function exit (){
	mongoose.disconnect();
}