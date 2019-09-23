#!/usr/bin/env bash
stitch-cli login --api-key=$STITCH_PUBLIC_API_KEY --private-api-key=$STITCH_PRIVATE_API_KEY
stitch-cli import --app-id $STITCH_APPID --strategy=replace --path=./MovieCollection --include-hosting --reset-cdn-cache
stitch-cli logout
