#!/usr/bin/env bash
if [ $# -eq 0 ]
then
  echo "Missing title argument!";
  exit 1
fi
curl -H "Content-Type: application/json" -d "{\"Title\":\"${1}\"}" https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moviecollection-vazgz/service/IMDB/incoming_webhook/post_movie_title?secret=test
