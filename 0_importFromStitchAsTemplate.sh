#!/usr/bin/env bash
rm -rf MovieCollectionTemplate
stitch-cli login --api-key=$STITCH_PUBLIC_API_KEY --private-api-key=$STITCH_PRIVATE_API_KEY
stitch-cli export --app-id=$STITCH_APPID --as-template --include-hosting -o ./MovieCollectionTemplate
stitch-cli logout
