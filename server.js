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

var PORT = process.env.PORT || 3000;

var app = express();

app.engine('handlebars', handlebars({extname: 'handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.set('views',path.join(__dirname, 'views'));

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news", {
  useMongoClient: true
});

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);

require("./routes/api-routes")(app);


app.listen(PORT, function() {
  console.log("RUNNING ON PORT " + PORT + "!");
});