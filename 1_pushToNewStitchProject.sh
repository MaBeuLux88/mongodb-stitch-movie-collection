#!/usr/bin/env bash
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
stitch-cli import --path=./MovieCollectionTemplate --include-hosting
echo "As you can see, there is an error. That's normal, we are waiting Stitch CLI v2 to solve this problem."
echo "For the moment, you have to create the custom secret manually in your browser."
echo "Log in MongoDB Stitch, find your new project and go to 'Values \& Secrets' > 'Secret'."
echo "Add a secret with:"
echo "- Secret Name: 'imdb_api_key_secret',"
echo "- Secret Value is the value you received by email from OMDB API."
read -n 1 -s -r -p "Press any key to continue once the secret is added."

APPID=$(grep app_id MovieCollectionTemplate/stitch.json | cut -d'"' -f4)
echo -e "\nReplacing original APPID by the new one: $APPID in the Google authentication and website."
sed -i "s/moviecollection-[a-z]*/$APPID/g" MovieCollectionTemplate/auth_providers/oauth2-google.json MovieCollectionTemplate/hosting/files/data.js

read -p "Enter your cluster name in MongoDB Atlas [Cluster0]: " CLUSTER
CLUSTER=${CLUSTER:-Cluster0}
echo "Replacing the cluster name in the template config file."
sed -i "s/Cluster0/$CLUSTER/g" MovieCollectionTemplate/services/mongodb-atlas/config.json

stitch-cli import --path=./MovieCollectionTemplate --include-hosting --reset-cdn-cache --strategy=replace
stitch-cli logout
