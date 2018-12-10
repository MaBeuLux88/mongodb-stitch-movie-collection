#!/usr/bin/env bash
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
stitch-cli import --app-name=MovieCollection --strategy=replace --path=./MovieCollection
stitch-cli logout
