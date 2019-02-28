#!/usr/bin/env bash
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
stitch-cli import --app-id $STITCH_APPID --strategy=replace --path=./MovieCollection --include-hosting --reset-cdn-cache
stitch-cli logout
