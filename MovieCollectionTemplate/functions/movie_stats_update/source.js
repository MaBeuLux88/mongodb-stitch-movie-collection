exports = function (changeEvent) {
    const db = context.services.get("mongodb-atlas").db("stitch");
    const stats = db.collection("movies_stats");

    let metascore = parseFloat(changeEvent.updateDescription.updatedFields.Metascore);
    let imdbRating = parseFloat(changeEvent.updateDescription.updatedFields.imdbRating);

    console.log("Metascore : " + metascore);
    console.log("IMDB Rating : " + imdbRating);

    stats.findOne({"_id": "movies"})
        .then(doc => {
            console.log(EJSON.stringify(doc));
            doc = doc ||
                {
                    "_id": "movies",
                    "avg_metascore": 0.0,
                    "avg_metascore_count": 0,
                    "avg_imdbRating": 0.0,
                    "avg_imdbRating_count": 0
                };
            if (!isNaN(metascore)) {
                console.log("Update metascore.");
                doc.avg_metascore = (doc.avg_metascore * doc.avg_metascore_count + metascore) / (doc.avg_metascore_count + 1);
                doc.avg_metascore_count++;
            }
            if (!isNaN(imdbRating)) {
                console.log("Update rating.");
                doc.avg_imdbRating = (doc.avg_imdbRating * doc.avg_imdbRating_count + imdbRating) / (doc.avg_imdbRating_count + 1);
                doc.avg_imdbRating_count++;
            }
            stats.updateOne({"_id": "movies"}, {"$set": doc}, {upsert: true})
                .then(() => {
                    console.log("Update stats OK.");
                })
                .catch(e => {
                    console.log("Update stats failed.", e);
                });
        })
        .catch(e => {
            console.log("Find stats failed.", e);
        });
};
