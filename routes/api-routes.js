var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");

// var router = express.Router();

module.exports = function(app) {

	// Grab every document in the Articles collection
	app.get("/", function (request, response) {
	  db.Article
	    .find({})
	    .where('saved', 'false')
	    .limit(20)
	    .then(function(dbArticle) {
	    	response.render('index', { articles: dbArticle });
	    })
	    .catch(function(error) {
	    	response.json(error);
	    });
	})



		// Grab every document in the Articles collection
	app.get("/saved", function (request, response) {

	  db.Article
	    .find({})
	    .where('saved', 'true')
	    .limit(20)
	    .then(function(dbArticle) {
	    	response.render('index', { articles: dbArticle });
	    })
	    .catch(function(error) {
	    	response.json(error);
	    });
	})

	app.get("/scrape", function(req, res) {

	  axios.get('https://www.washingtonpost.com/').then(function(response) {

	    var $ = cheerio.load(response.data);

		$('.headline a').each(function(i, element) {
	      var result = {};

	      // Add the text and href of every link, and save them as properties of the result object
	      result.title = $(this).text();
	      result.link = $(this).attr("href");

	      // Create a new Article using the `result` object built from scraping
	      
	      db.Article
	        .create(result)
	        .then(function(dbArticle) {
	          res.send("Scrape Complete");
	        })
	        .catch(function(error) {

	          res.json(error);
	        });
	    });
	    
	  }).catch(function(error) {
	  	console.log(error)
	  })
		res.redirect('/');

	});


		
	app.get("/article/:id", function(req, res) {
	  db.Article
	    .findOne({ _id: req.params.id })
	    .populate("note")
	    .then(function(dbArticle) {
	      
	      res.json(dbArticle);

	    })
	    .catch(function(err) {
	      res.json(err);
	    });
	});
	  








	// Route for saving/updating an Article's associated Note
	app.post("/article/:id", function(req, res) {
		console.log(req.params.id)
		console.log(req.body)
	    // Create a new note and pass the req.body to the entry
	    db.Note
	      .create(req.body)
	      .then(function(dbNote) {
	        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
	        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
	        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
	        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id },  { new: true });
	      })
	      .then(function(dbNotes) {
	        // If we were able to successfully update an Article, send it back to the client
	        res.json(dbNotes);
	      })
	      .catch(function(err) {
	        // If an error occurred, send it to the client
	        res.json(err);
	      });
	  });

	//Route for updating an the saved state of an article
	app.put("/articles/:id", function(req, res) {
		console.log(req.params.id);
		console.log(req.body.saved);
		db.Article.update(
			{ _id: req.params.id },
			{$set: req.body}
		).then(function(dbArticle) {
	        //Update article and send it back to the client
	        res.json(dbArticle);
	      })
	      .catch(function(err) {
	        //Send error back to the client if one occurs
	        res.json(err);
	      });
	  });

}


