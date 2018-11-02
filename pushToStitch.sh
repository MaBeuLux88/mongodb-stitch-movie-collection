#!/usr/bin/env bash
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
stitch-cli import --app-id=$STITCH_APPID --app-name=StitchTest --strategy=replace --path=./StitchTest
stitch-cli logout
