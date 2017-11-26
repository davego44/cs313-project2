const express = require('express');
const path = require('path');
const db = require('./db.js');

exports.getRouter = function() {
	var overallRouter = express.Router();
	//get
	overallRouter.get('/posts', getRecentBlogEntries);
	overallRouter.get('/tutorials', getRecentTutorialsEntries);
	overallRouter.get('/products', getRecentProductsEntries);
	return overallRouter;
}
	
function getRecentBlogEntries(request, response) {
	db.query('SELECT * FROM project2.blog ORDER BY posted DESC LIMIT 2', [], (err, res) => {
		if (err)
			throw err;
		response.json(res.rows);
	});
}

function getRecentTutorialsEntries(request, response) {
	db.query('SELECT * FROM project2.tutorial ORDER BY posted DESC LIMIT 2', [], (err, res) => {
		if (err)
			throw err;
		response.json(res.rows);
	});
}

function getRecentProductsEntries(request, response) {
	db.query('SELECT * FROM project2.product ORDER BY posted DESC LIMIT 2', [], (err, res) => {
		if (err)
			throw err;
		response.json(res.rows);
	});
}