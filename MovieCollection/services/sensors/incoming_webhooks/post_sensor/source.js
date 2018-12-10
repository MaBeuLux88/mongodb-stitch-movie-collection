exports = function(payload, response) {
  const mongodb = context.services.get("mongodb-atlas");
  const sensors = mongodb.db("stitch").collection("sensors");
  var body = EJSON.parse(payload.body.text());
  body.createdAt = new Date();
  sensors.insertOne(body)
  .then(result => {
    response.setStatusCode(201);
  });
};