const express = require('express');
const path = require('path');
const db = require('./db.js');

exports.getRouter = function() {
	var tutorialsRouter = express.Router();
	//get
	tutorialsRouter.get('/', getEntireCollection); //get entire collection
	tutorialsRouter.get('/:id', getSingleEntry); //get a single entry
	tutorialsRouter.get('/keywords/:keywords', getEntriesByKeyword); //get entries by keywords
	//put
	tutorialsRouter.put('/:id/:title/:author_id/:content', replaceEntry); //replace (or create) a single entry
	//patch
	tutorialsRouter.patch('/:id/:title/:author_id/:content', replaceEntry); //update a single entry
	//post
	tutorialsRouter.post('/:id/:title/:author_id/:content', replaceEntry); //add an entry
	//delete
	tutorialsRouter.delete('/:id', deleteSingleEntry); //delete a single entry
	return tutorialsRouter;
}
	
function getEntireCollection(req, res) {
	db.query('SELECT * FROM project2.tutorial', [], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}

function getSingleEntry(req, res) {
	db.query('SELECT * FROM project2.tutorial WHERE id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}

function getEntriesByKeyword(req, res) {
	var arr = req.params.keywords.split(',');
	var params = [];
	for (var i = 1; i <= arr.length; i++)
		params.push('$' + i);
	db.query("SELECT DISTINCT ON (t.id) t.title, author_id, content FROM project2.tutorial As t JOIN project2.tutorialkeyword " +
		     "AS tkw ON t.id = tkw.tutorial_id JOIN project2.keyword AS kw ON kw.id = tkw.keyword_id " +
			 "WHERE kw.title IN (" + params.join(',') + ");", arr, (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}

function replaceEntry(req, res) {
	db.query("INSERT INTO project2.tutorial (id, title, author_id, content) " + 
		     "VALUES ($1,$2,$3,$4) " + 
			 "ON CONFLICT (id) DO UPDATE SET title = $2, author_id = $3, content = $4;", 
			 [req.params.id, req.params.title, req.params.author_id, req.params.content], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}

function deleteSingleEntry(req, res) {
	db.query('DELETE FROM project2.diyupload WHERE tutorial_id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	db.query('DELETE FROM project2.blogtutorial WHERE tutorial_id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	db.query('DELETE FROM project2.tutorialkeyword WHERE tutorial_id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	db.query('DELETE FROM project2.tutorial WHERE id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}