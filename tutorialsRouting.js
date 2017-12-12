const express = require('express');
const path = require('path');
const db = require('./db.js');

exports.getRouter = function() {
	var tutorialsRouter = express.Router();
	//get
	tutorialsRouter.get('/', getEntireCollection); //get entire collection
	tutorialsRouter.get('/:id', getSingleEntry); //get a single entry
	tutorialsRouter.get('/keywords/:keywords', getEntriesByKeyword); //get entries by keywords
	//post
	tutorialsRouter.post('/diy', addDIY);
	//delete
	//tutorialsRouter.delete('/:id', deleteSingleEntry); //delete a single entry
	return tutorialsRouter;
}
	
function getEntireCollection(req, response) {
	db.query('SELECT * FROM project2.tutorial', [], (err, res) => {
		if (err)
			throw err;
		response.json(res.rows);
	});
}

function getSingleEntry(req, response) {
	db.query('SELECT * FROM project2.tutorial WHERE id = $1', [req.params.id], (errT, resT) => {
		if (errT)
			throw errT;
		db.query('SELECT * FROM project2.diyupload WHERE tutorial_id = $1', [req.params.id], (errD, resD) => {
			if (errD)
				throw errD;
			resT.rows[0].diys = resD.rows;
			response.json(resT.rows);
		});
	});
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

function addDIY(req, response) {
	if (req.session.username) {
		db.query('INSERT INTO project2.diyupload (tutorial_id, content, author_name) VALUES ($1, $2, $3)', 
				 [req.body.id, req.body.tutorial, req.session.username], (err, res) => {
			if (err)
				throw err;
			response.json({"success" : true, "status" : 200, "user" : req.session.username});
		});
	} else {
		response.status(401).send({message: 'Must be signed in.'});
	}
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

/*function deleteSingleEntry(req, res) {
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
}*/