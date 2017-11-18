const express = require('express');
const path = require('path');
const db = require('./db.js');

exports.getRouter = function() {
	var postsRouter = express.Router();
	//get
	postsRouter.get('/', getEntireCollection); //get entire collection
	postsRouter.get('/:id', getSingleEntry); //get a single entry
	postsRouter.get('/keywords/:keywords', getEntriesByKeyword); //get entries by keywords
	//put
	postsRouter.put('/:id/:title/:author_id/:content', replaceEntry); //replace (or create) a single entry
	//patch
	postsRouter.patch('/:id/:title/:author_id/:content', replaceEntry); //update a single entry
	//post
	postsRouter.post('/:id/:title/:author_id/:content', replaceEntry); //add an entry
	//delete
	postsRouter.delete('/:id', deleteSingleEntry); //delete a single entry
	return postsRouter;
}
	
function getEntireCollection(req, res) {
	db.query('SELECT * FROM project2.blog', [], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}

function getSingleEntry(req, res) {
	db.query('SELECT * FROM project2.blog WHERE id = $1', [req.params.id], (err, res) => {
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
	db.query("SELECT DISTINCT ON (b.id) b.title, author_id, content FROM project2.blog As b JOIN project2.blogkeyword " +
		     "AS bkw ON b.id = bkw.blog_id JOIN project2.keyword AS kw ON kw.id = bkw.keyword_id " +
			 "WHERE kw.title IN (" + params.join(',') + ");", arr, (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}

function replaceEntry(req, res) {
	db.query("INSERT INTO project2.blog (id, title, author_id, content) " + 
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
	db.query('DELETE FROM project2.comment WHERE blog_id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	db.query('DELETE FROM project2.blogtutorial WHERE blog_id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	db.query('DELETE FROM project2.blogkeyword WHERE blog_id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	db.query('DELETE FROM project2.blog WHERE id = $1', [req.params.id], (err, res) => {
		if (err)
			throw err;
		console.log(res.rows);
	});
	res.end();
}