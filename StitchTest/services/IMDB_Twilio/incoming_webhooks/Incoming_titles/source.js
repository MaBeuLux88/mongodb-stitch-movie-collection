exports = function(payload) {
  const mongodb = context.services.get("mongodb-atlas");
  const movies = mongodb.db("stitch").collection("movies");
  movies.insertOne(
    {
      "Title":payload.Body.trim(),
      "OwnerPhone": payload.From
    }
  )
  .then(result => {
    response.setBody(result.insertedId);
  });
};
