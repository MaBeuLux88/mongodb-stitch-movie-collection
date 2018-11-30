exports = function(changeEvent) {
  var docId = changeEvent.documentKey._id;
  var title = encodeURIComponent(changeEvent.fullDocument.Title.trim());
  
  var movies = context.services.get("mongodb-atlas").db("stitch").collection("movies");
  var apikey = context.values.get("imdb-api-key");
  var imdb_url = "http://www.omdbapi.com/?apikey=" + apikey + "&t=" + title;
  
  const http = context.services.get("IMDB");
    return http
      .get({ url: imdb_url })
      .then(resp => {
        var doc = EJSON.parse(resp.body.text());
        if (doc.Response == "False") {
          movies.deleteOne({"_id":docId});
        } else {
          movies.updateOne({"_id":docId}, {$set: doc});
        }
      });
};
