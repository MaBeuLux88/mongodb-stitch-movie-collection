#!/usr/bin/env bash
if [ $# -eq 0 ]
then
  echo "Missing title argument!";
  exit 1
fi
body='{"Title":"'${1}'"}'
curl -H "Content-Type: application/json" -d "$body" https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchtest-adsgi/service/IMDB/incoming_webhook/post_movie_title?secret=test
