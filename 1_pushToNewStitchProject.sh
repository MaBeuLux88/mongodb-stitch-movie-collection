#!/usr/bin/env bash
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY

# Get all the values we need to setup the app correctly.
read -p "Enter your cluster name in MongoDB Atlas [Cluster0]: " CLUSTER
read -p "Please enter your Google OAuth 2.0 client ID [FIX-LATER]: " GOOGLE_ID
read -sp "Please enter your Google OAuth 2.0 client secret [FIX-LATER]: " GOOGLE_SECRET
echo
read -p "Please enter your Twilio account SID [FIX-LATER]: " TWILIO_ID
read -sp "Please enter your Twilio auth token [FIX-LATER]: " TWILIO_SECRET
echo
read -sp "Please enter the OMDB API key [FIX-LATER]: " OMDB_API_KEY
echo

# Default values if variables are empty.
CLUSTER=${CLUSTER:-Cluster0}
GOOGLE_ID=${GOOGLE_ID:-FIX-LATER}
GOOGLE_SECRET=${GOOGLE_SECRET:-FIX-LATER}
TWILIO_ID=${TWILIO_ID:-FIX-LATER}
TWILIO_SECRET=${TWILIO_SECRET:-FIX-LATER}
OMDB_API_KEY=${OMDB_API_KEY:-FIX-LATER}

echo "Replacing the cluster name in the template config file."
sed -i "s/Cluster0/$CLUSTER/g" MovieCollectionTemplate/services/mongodb-atlas/config.json

echo "Replacing the Google OAuth 2.0 client ID in the template config file."
sed -i "s/713365605425-9o5lagdh2o65c04nkg574rb7p2090nep.apps.googleusercontent.com/$GOOGLE_ID/g" MovieCollectionTemplate/auth_providers/oauth2-google.json

echo "Replacing the Twilio account SID in the template config file."
sed -i "s/ACa63666b4d7c9d4cfc7e25ed691e77b1f/$TWILIO_ID/g" MovieCollectionTemplate/services/IMDB_Twilio/config.json

# Make a first import to create the app.
# It will fail because of the missing secrets but now we have the new app-id.
stitch-cli import --path=./MovieCollectionTemplate --include-hosting 2> /dev/null

APPID=$(grep app_id MovieCollectionTemplate/stitch.json | cut -d'"' -f4)
echo "Replacing original APPID by the new one: $APPID in the Google authentication and website."
sed -i "s/moviecollection-[a-z]*/$APPID/g" MovieCollectionTemplate/auth_providers/oauth2-google.json MovieCollectionTemplate/hosting/files/data.js

echo "Adding missing secrets in MongoDB Stitch."
stitch-cli secrets add --app-id=$APPID --name=google_client_secret --value=$GOOGLE_SECRET
stitch-cli secrets add --app-id=$APPID --name=twilio_auth_token --value=$TWILIO_SECRET
stitch-cli secrets add --app-id=$APPID --name=imdb_api_key_secret --value=$OMDB_API_KEY

# Final import in Stitch
stitch-cli import --path=./MovieCollectionTemplate --include-hosting --reset-cdn-cache --strategy=replace
stitch-cli logout
