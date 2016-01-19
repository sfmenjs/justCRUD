"use strict";
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 3000;
let Bear = require('./models/bear');

app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

// GET /bears
app.get('/bears', (req, res) => {
	res.send(Bear.getAllBears());
});

// GET /bears/:id
app.get('/bears/:id', (req, res) => {
	Bear.findById(req.params.id, (err, result) => {
		if(err) return res.status(400).send(err);
		res.send(result);
	});
});

// POST /bears
app.post('/bears', (req, res) => {
	Bear.create(req.body, (err, result) => {
		if(err) return res.status(400).send(err);
		res.send(result);
	});
});

// PUT /bears/:id
app.put('/bears/:id', (req, res) => {
	if(req.params.id !== req.body._id) return res.status(500).send('Invalid id');
	Bear.update(req.params.id, req.body, (err, result) => {
		if(err) return res.status(400).send(err);
		res.send(result);
	});
});

// DELETE /bears/:id
app.delete('/bears/:id', (req, res) => {
	Bear.delete(req.params.id, (err, result) => {
		if(err) return res.status(400).send(err);
		res.send(result);
	});
});

module.exports = app.listen(port, function() {
	console.log('Example app listening at http://localhost:' + port);
});
