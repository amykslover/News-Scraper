// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose")
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var axios = require("axios");
var logger = require("morgan");
var path = require("path");

var db = require("./models");

var PORT = process.env.PORT || 7000;

var app = express();

app.engine('handlebars', handlebars({extname: 'handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/news", function (error, database) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database Connection Ready");

  // Initialize the app.
  var server = app.listen(PORT, function () {
    var port = server.address().port;
    console.log("RUNNING ON PORT " + PORT + "!");
  });
});

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);

require("./routes/api-routes")(app);
