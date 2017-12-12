const express = require('express');
const path = require('path');
const db = require('./db.js');

exports.getRouter = function() {
	var productsRouter = express.Router();
	//get
	productsRouter.get('/', getEntireCollection); //get entire collection
	productsRouter.get('/:id', getSingleEntry); //get a single entry
	//productsRouter.get('/recent', getRecentEntries); //get 2 recent entries
	//put
	//productsRouter.put('/:id/:title/:description/:cost/:count', replaceEntry); //replace (or create) a single entry
	//patch
	//productsRouter.patch('/:id/:title/:description/:cost/:count', replaceEntry); //update a single entry
	//post
	//productsRouter.post('/:id/:title/:description/:cost/:count', replaceEntry); //add an entry
	//delete
	//productsRouter.delete('/:id', deleteSingleEntry); //delete a single entry
	return productsRouter;
}
	
function getEntireCollection(req, response) {
	db.query('SELECT * FROM project2.product', [], (err, res) => {
		if (err)
			throw err;
		response.json(res.rows);
	});
}

function getSingleEntry(req, response) {
	db.query('SELECT * FROM project2.product WHERE id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		response.json(res.rows);
	});
}

/*function getRecentEntries(req, response) {
	db.query('SELECT * FROM project2.product ORDER BY posted DESC LIMIT 2', [], (err, res) => {
		if (err)
			throw err;
		response.json(res.rows);
	});
}*/

/*function replaceEntry(req, res) {
	db.query("INSERT INTO project2.product (id, title, description, cost, count) " + 
		     "VALUES ($1,$2,$3,$4,$5) " + 
			 "ON CONFLICT (id) DO UPDATE SET title = $2, description = $3, cost = $4, count = $5;", 
			 [req.params.id, req.params.title, req.params.description, req.params.cost, req.params.count], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}

function deleteSingleEntry(req, res) {
	db.query('DELETE FROM project2.product WHERE id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}*/