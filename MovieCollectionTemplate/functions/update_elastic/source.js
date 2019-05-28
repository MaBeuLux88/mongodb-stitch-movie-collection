exports = function(changeEvent) {
  var docId = changeEvent.documentKey._id;
  var docJSON = changeEvent.fullDocument;
  delete docJSON._id;
  var docString = EJSON.stringify(docJSON);
  console.log(docString);
  
  var elastic_url = "https://search-elastic-stitch-demo-zd7gx6v4dpo3htn7lmwehd43aq.us-west-2.es.amazonaws.com/stitch/movies/" + docId;
  
  const http = context.services.get("IMDB");
    return http
      .post({ url: elastic_url, headers: {"Content-Type": [ "application/json" ]}, body: docString })
      .then(resp => {
        console.log(resp.body.text());
      });
};
