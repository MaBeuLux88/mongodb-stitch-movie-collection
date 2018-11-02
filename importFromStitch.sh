#!/usr/bin/env bash
rm -rf StitchTest
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
stitch-cli export --app-id=$STITCH_APPID
stitch-cli logout
