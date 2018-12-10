#!/usr/bin/env bash
while read title; do
  echo Sending title : $title...
  ./post.sh "$title"
done < title_list.txt
