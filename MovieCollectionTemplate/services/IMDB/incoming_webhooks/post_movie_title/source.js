exports = function(payload, response) {
  const mongodb = context.services.get("mongodb-atlas");
  const movies = mongodb.db("stitch").collection("movies");
  var body = EJSON.parse(payload.body.text());
  movies.insertOne(body)
  .then(result => {
    response.setStatusCode(201);
  })
  .catch( e => {
    console.log(e);
    response.setStatusCode(403);
  });
};
