exports = function (changeEvent) {
    const db = context.services.get("mongodb-atlas").db("stitch");
    const movies = db.collection("movies");
    const stats = db.collection("movies_stats");
    const pipeline = [{
        $facet: {
            metascore: [{$match: {Metascore: {$exists: 1, $ne: "N/A"}}}, {
                $group: {
                    _id: null,
                    "avg_metascore": {"$avg": {$toInt: "$Metascore"}},
                    "avg_metascore_count": {$sum: 1}
                }
            }],
            imdbRating: [{$match: {imdbRating: {$exists: 1, $ne: "N/A"}}}, {
                $group: {
                    _id: null,
                    "avg_imdbRating": {"$avg": {$toDouble: "$imdbRating"}},
                    "avg_imdbRating_count": {$sum: 1}
                }
            }]
        }
    }, {$unwind: {path: "$metascore"}}, {$unwind: {path: "$imdbRating"}}, {
        $project: {
            "avg_metascore": "$metascore.avg_metascore",
            "avg_metascore_count": "$metascore.avg_metascore_count",
            "avg_imdbRating": "$imdbRating.avg_imdbRating",
            "avg_imdbRating_count": "$imdbRating.avg_imdbRating_count"
        }
    }];

    movies.count().then(nbDocs => {
      if (nbDocs === 0) {
        console.log("Movies stats reset.");
        stats.deleteOne({'_id': 'movies'});
      } else {
        movies.aggregate(pipeline).next().then(doc => {
        console.log("aggregate stats : ", EJSON.stringify(doc));
        stats.updateOne({"_id": "movies"}, {"$set": doc});
    }).catch(e => console.log("Update stats during movie deletion failed.", e));
      }
    }).catch(e => console.log("Fail counting movies", e));
};
