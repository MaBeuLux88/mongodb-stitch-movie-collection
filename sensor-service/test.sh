#!/usr/bin/env bash
curl -H "Content-Type: application/json" -d '{"temp":22.4}' https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchtest-adsgi/service/PostSensors/incoming_webhook/webhookpost?secret=test
