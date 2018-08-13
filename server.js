// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require('dotenv').config();
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve static content
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/scraper_controller.js");

app.use("/", routes);

const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
var promise = mongoose.connect(db, { useNewUrlParser: true }); //connect to mongoose database
mongoose.connection.on('connected', () => {     //tell us if we are connected
console.log('Connected to database mongodb://localhost:27017/test')
});

mongoose.connection.on('error', (error) => {     //tell the error if it occurs
console.log('Database Error'+ error)
});

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});
