/*
  See https://www.twilio.com/docs/api/twiml/sms/twilio_request for
  an example of a payload that Twilio would send.

  Try running in the console below.
*/
// test import  
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
