#!/usr/bin/env bash
rm -rf MovieCollection
stitch-cli login --api-key=$STITCH_PUBLIC_API_KEY --private-api-key=$STITCH_PRIVATE_API_KEY
stitch-cli export --app-id=$STITCH_APPID --include-hosting -o ./MovieCollection
stitch-cli logout
