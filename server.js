  var cheerio = require("cheerio");
  var request = require("request");
  var express = require("express");
  var mongojs = require("mongojs");

  var app = express();
  var PORT = process.env.PORT || 3000;
  var databaseUrl = "momgoDB";
  var collections = ["scrapeData"];

  app.use(express.static("public"));
  // Hook mongojs configuration to the db variable
  var db = mongojs(databaseUrl, collections);
  db.on("error", function(error) {
    console.log("Database Error:", error);
  });

  // Main route (simple Hello World Message)
  app.get("/", function(req, res) {
    res.send(index.html);
  });

  // Retrieve data from the db
  app.get("/all", function(req, res) {
    // Find all results from the scrapeData collection in the db
    db.scrapeData.find({}, function(error, found) {
      console.log(found);
      //throw any errors to the console
      if (error) {
        console.log(error);
      }
      //if there are no errors, send the data to the browser
      else {
        res.json(found);
      }
    })
  })

  app.get("/scrape", function(req, res) {
    scrape().then(results => {
      results.forEach(result => {
        db.scrapeData.insert(result)
      })
      res.redirect("/all");
    })
  })
  // function scrape(){
  //   return new Promise ((resolve, reject)=>{
  //     request("http://nytimes.com/section/health", function(error, response, html){
  //       var $= cheerio.load(html);
  //       var results = [];
  //       $(".story-body").each(function(i, element){
  //         var title = $(element).find("h2.headline").text().trim();
  //         var summary = $(element).find("p.summary").text().trim();
  //         var url = $(element).find("a").attr("href").trim();
  //         results.push({
  //           Title: title,
  //           Summary: summary,
  //           URL: url
  //         });
  //       });
  //       console.log(results);
  //       resolve(results);
  //     })
  //   })
  // }

function scrape() {
  return new Promise ((resolve, reject) => {
    request("https://www.imdb.com/movies-in-theaters/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2413b25e-e3f6-4229-9efd-599bb9ab1f97&pf_rd_r=FZCPVB87325RAQSM8CWE&pf_rd_s=right-2&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_otw_hd", function(error, response, html) {

  var $ = cheerio.load(html);
  var results = [];

  $(".list_item").each(function(i, element) {
    var movie_name = $(element).find('h4').children().attr('title');
    var actors = $(element).find('[itemprop="actors"]');

    const actorArray = [];
    actors.each((i, el) => actorArray.push($(el).text().split('\n')[2]));
    // var actor_list = actors.text().replace(/  /g, '').split('\n').filter(Boolean);

    var genre = $(element).find('[itemprop="genre"]');
    const genreArray = [];
    genre.each((i, el) => genreArray.push($(el).text()));
    // var genre = genre_list.text();
    var time = $(element).find('[itemprop="duration"]').text();

    results.push({
      Movie_Title: movie_name,
      Movie_Genre: genreArray,
      Movie_Duration: time,
      Actors: actorArray,

    });
  });
  console.log(results);
  resolve(results);
  });
})
}

  // Listen on port 3000
  app.listen(PORT, function() {
    console.log("App running on port 3000!");
  });
