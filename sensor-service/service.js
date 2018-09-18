exports = function(payload, response) {
  const mongodb = context.services.get("mongodb-atlas");
  const sensor = mongodb.db("test").collection("sensor");
  var body = EJSON.parse(payload.body.text());
  body.createdAt = new Date();
  sensor.insertOne(body)
  .then(result => {
    response.setStatusCode(201);
    response.setBody(result.insertedId);
  });
};
