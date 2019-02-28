#!/usr/bin/env bash
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
stitch-cli import --app-name=MovieCollection --path=./MovieCollectionTemplate --include-hosting
stitch-cli logout
