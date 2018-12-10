# MongoDB Stitch Demo

## Import the Stitch App

 * Create a [free cluster in MongoDB Atlas](https://docs.mongodb.com/manual/tutorial/atlas-free-tier-setup/).
 * Install [Stitch CLI](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/).
 * [Setup the API key](https://docs.atlas.mongodb.com/configure-api-access/) + whitelist your IP address in Atlas.
 * Add the following environment variable in your env

```sh
export STITCH_USERNAME="<your email>"
export STITCH_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
export STITCH_APPID="myproject-abcde"
```

 * Add the [secrets](https://docs.mongodb.com/stitch/import-export/application-schema/#sensitive-information) for [Google Authentication](https://console.developers.google.com/apis/credentials) & [Twilio](https://www.twilio.com/console/sms/services) : create the file MovieCollection/secrets.json

```js
{
  "auth_providers": {
    "oauth2-google": {
      "clientSecret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  },
  "services": {
    "IMDB_Twilio": {
      "auth_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  }
}

```
 
 * Update the file `MovieCollection/values/imdb-api-key.json` with a [real API Key](http://www.omdbapi.com/apikey.aspx).
 * Start the `pushToStitch.sh` script and follow the instructions.

## Ideas & support

Please open Github tickets.

