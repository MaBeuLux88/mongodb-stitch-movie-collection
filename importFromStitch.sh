#!/usr/bin/env bash
rm -rf MovieCollection
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
stitch-cli export --app-id=$STITCH_APPID --as-template --include-hosting
stitch-cli logout
