# MongoDB Stitch Demo

## Import the Stitch App

 * Create a [free cluster in MongoDB Atlas](https://docs.mongodb.com/manual/tutorial/atlas-free-tier-setup/).
 * Install [Stitch CLI](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/).
 * [Setup the API key](https://docs.atlas.mongodb.com/configure-api-access/) + whitelist your IP address in Atlas.
 * Add the following environment variable in your env.

```sh
export STITCH_USERNAME="<your Atlas login email>"
export STITCH_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

 * Add the [secrets](https://docs.mongodb.com/stitch/import-export/application-schema/#sensitive-information) for [Google Authentication](https://console.developers.google.com/apis/credentials) & [Twilio](https://www.twilio.com/console/sms/services) : create the file MovieCollection/secrets.json. If you don't want to do that now, insert fake secrets and you can fix them later or remove those features in the Stitch website after the import.

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
 * Start the `1_pushToNewStitchProject.sh` script and follow the instructions.
 * Add the following environment variable in your env. You will find this APP ID in the top left corner in the Stitch website.

```sh
export STITCH_APPID="myproject-abcde"
```

## Ideas & support

 * Please open Github tickets.
 * This is still a work in progress project so please don't judge me too much just yet :-).

