exports = function(payload, response) {
  const mongodb = context.services.get("mongodb-atlas");
  const sensors = mongodb.db("stitch").collection("sensors");
  return sensors.findOne();
};