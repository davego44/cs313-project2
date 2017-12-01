const express = require('express');
const path = require('path');
const db = require('./db.js');

exports.getRouter = function() {
	var overallRouter = express.Router();
	//get
	overallRouter.get('/posts', getRecentBlogEntries);
	overallRouter.get('/tutorials', getRecentTutorialsEntries);
	overallRouter.get('/products', getRecentProductsEntries);
	overallRouter.get('/search/:text', getSearchResults);
	//post
	overallRouter.post('/signin', signin);
	overallRouter.post('/signout', signout);
	overallRouter.post('/create', createAcct);
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

function getSearchResults(request, response) {
	var search = request.params.text;
	db.query("SELECT * FROM project2.blog WHERE title LIKE '%" + search + "%' OR content LIKE '%" + search + 
			 "%' OR caption LIKE '%" + search + "%' LIMIT 5", [], (errB, resB) => {
		if (errB)
			throw errB;
		db.query("SELECT * FROM project2.tutorial WHERE title LIKE '%" + search + "%' OR content LIKE '%" + search + 
			     "%' OR caption LIKE '%" + search + "%' LIMIT 5", [], (errT, resT) => {
			if (errT)
				throw errT;
			db.query("SELECT * FROM project2.product WHERE title LIKE '%" + search + "%' OR description LIKE '%" + search + "%' LIMIT 5", [], (errP, resP) => {
				if (errP)
					throw errP;
				for (var i = 0; i < resT.rows.length; i++) {
					resB.rows.push(resT.rows[i]);
				}
				for (var i = 0; i < resP.rows.length; i++) {
					resB.rows.push(resP.rows[i]);
				}
				response.json(resB.rows);
			});
		});
	});
}

function signin(request, response) {
	db.query('SELECT * FROM project2.user WHERE username=$1 AND password=$2', 
			 [request.body.username, request.body.password], (err, res) => {
		if (err)
			throw err;
		if (request.session.username) {
			response.json({"success" : true, "status" : 200});
		} else if (res.rows.length > 0) {
			request.session.username = request.body.username;
			response.json({"success" : true, "status" : 200});
		} else {
			response.status(401).send({message: 'Username or password was entered incorrectly.'});
		}
	});
}

function signout(request, response) {
	if (request.session.username) {
		request.session.destroy();
		response.json({"success" : true, "status" : 200});
	} else {
		response.json({"success" : true, "status" : 200});
	}
}

function createAcct(request, response) {
	db.query('SELECT * FROM project2.user WHERE username=$1 OR email=$2', 
		     [request.body.username, request.body.email], (err, res) => {
		if (err)
			throw err;
		if (res.rows.length > 0) {
			if (res.rows.email == request.body.email) {
				response.status(401).send({message: 'Email has already been registered.'});
			} else {
				response.status(401).send({message: 'Username has already been taken.'});
			}
		} else {
			db.query('INSERT INTO project2.user (username, password, first_name, last_name, email) VALUES ($1,$2,$3,$4,$5)',
					 [request.body.username, request.body.password, request.body.first, request.body.last, request.body.email], 
					 (errI, resI) => {
				if (errI)
					throw errI;
				request.session.username = request.body.username;
				response.json({"success" : true, "status" : 200});
			});
		}
	});
}