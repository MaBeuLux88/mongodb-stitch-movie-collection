exports = function(changeEvent) {
  let metascore = parseFloat(changeEvent.updateDescription.updatedFields.Metascore);
  let imdbRating = parseFloat(changeEvent.updateDescription.updatedFields.imdbRating);

  console.log("Metascore : " + metascore);
  console.log("IMDB Rating : " + imdbRating);

  const stats = context.services.get("mongodb-atlas").db("stitch").collection("movies_stats");
  stats.findOne({"stats":"movies"}).then(
    doc => {
      console.log(EJSON.stringify(doc));
      doc = doc ||
      {
        "avg_metascore" : 0.0,
        "avg_metascore_count" : 0,
        "avg_imdbRating" : 0.0,
        "avg_imdbRating_count" : 0
      };
      if (!isNaN(metascore)) {
        console.log("update metascore");
        doc.avg_metascore = (doc.avg_metascore * doc.avg_metascore_count + metascore) / (doc.avg_metascore_count + 1);
        doc.avg_metascore_count++;
      }
      if (!isNaN(imdbRating)) {
        console.log("update rating");
        doc.avg_imdbRating = (doc.avg_imdbRating * doc.avg_imdbRating_count + imdbRating) / (doc.avg_imdbRating_count + 1);
        doc.avg_imdbRating_count++;
      }
      stats.updateOne({"stats": "movies"}, {"$set" : doc}, {upsert: true});
    });
};
