exports = function(changeEvent) {
  const docId = changeEvent.documentKey._id;
  const title = encodeURIComponent(changeEvent.fullDocument.Title.trim());
  
  const movies = context.services.get("mongodb-atlas").db("stitch").collection("movies");
  const apikey = context.values.get("imdb-api-key");
  const imdb_url = "http://www.omdbapi.com/?apikey=" + apikey + "&t=" + title;
  console.log("Title : " + title);
  
  const http = context.services.get("IMDB");
    return http
      .get({ url: imdb_url })
      .then(resp => {
        console.log(resp.body.text());
        var doc = EJSON.parse(resp.body.text());
        if (doc.Response == "False") {
          movies.deleteOne({"_id":docId});
        } else {
          doc.DVD_ISO = context.functions.execute("toIsoDate", doc.DVD);
          doc.Released_ISO = context.functions.execute("toIsoDate", doc.Released);
          movies.updateOne({"_id":docId}, {$set: doc});
        }
      });
};
