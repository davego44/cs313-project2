const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

/***************************************************
	Routing: Blog Posts
****************************************************/
const posts = require('./postsRouting.js');

/***************************************************
	Routing: Tutorials
****************************************************/
const tutorials = require('./tutorialsRouting.js');

/***************************************************
	Routing: Products
****************************************************/
const products = require('./productsRouting.js');

/***************************************************
	Express
****************************************************/
express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/posts', posts.getRouter())
  .use('/tutorials', tutorials.getRouter())
  .use('/products', products.getRouter())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
