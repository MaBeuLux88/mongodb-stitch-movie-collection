const APP_ID = 'moviecollection-vazgz';
const ATLAS_SERVICE = 'mongodb-atlas';
let collStats;
let collMovies;
const statsFilter = {"_id": "movies"};

function initStats() {
    collStats.findOne(statsFilter)
        .then(doc => printStats(doc))
        .catch(e => console.log("Can't find movie stats.", e));
}

async function updateStats() {
    const changeStream = await collStats.watch([statsFilter._id]);
    changeStream.onNext(event => {
        console.log('Updating movie stats.', event);
        printStats(event.fullDocument);
    })
}

function printStats(movie_stats) {
    let avg_metascore = $('#avg_metascore');
    let avg_metascore_count = $('#avg_metascore_count');
    let avg_imdbRating = $('#avg_imdbRating');
    let avg_imdbRating_count = $('#avg_imdbRating_count');

    if (movie_stats) {
        avg_metascore.text(movie_stats.avg_metascore);
        avg_metascore_count.text(movie_stats.avg_metascore_count);
        avg_imdbRating.text(movie_stats.avg_imdbRating);
        avg_imdbRating_count.text(movie_stats.avg_imdbRating_count);
    } else {
        avg_metascore.text("0");
        avg_metascore_count.text("0");
        avg_imdbRating.text("0");
        avg_imdbRating_count.text("0");
    }
}

function addNewTitle() {
    const title = $("#title");
    console.log("Adding new title : " + title.val());
    collMovies.insertOne({"Title": title.val()}).then(async result => {
        title.val("");
        const changeStream = await collMovies.watch([result.insertedId]);
        changeStream.onNext((event) => {
            console.log('My movie update:', event);
            fetch_movies();
            changeStream.close()
        })
    }).catch(e => console.log("Insert new movie failed.", e));
}

function removeMovie() {
    const newTitle = $("#title");
    console.log("Removing title : " + newTitle.val());
    collMovies.deleteMany({"Title": newTitle.val()}).then(() => {
        newTitle.val("");
        fetch_movies();
    });
}

function removeAllMovies() {
    console.log("Removing all movies.");
    collStats.deleteOne(statsFilter).catch(e => console.log("Delete movie stats failed.", e));
    collMovies.deleteMany({}).then(function () {
        fetch_movies();
    }).catch(e => console.log("Delete all movies failed.", e));
}

function fetch_movies() {
    collMovies.find().toArray().then(docs => {
        console.log("Found movies", docs);
        let movies = $('#movies');
        movies.empty();
        for (let x in docs) {
            let doc = docs[x];
            let row = '' +
                '<tr>' +
                '<th scope="row">' + eval(eval(x) + 1) + '</th>' +
                '<td>' + doc.Title + '</td>' +
                '<td>' + doc.Year + '</td>' +
                '<td>' + doc.Released + '</td>' +
                '<td>' + doc.Released_ISO + '</td>' +
                '<td>' + doc.Runtime + '</td>' +
                '<td>' + doc.Genre + '</td>' +
                '<td>' + doc.Language + '</td>' +
                '<td>' + doc.Metascore + '</td>' +
                '<td>' + doc.imdbRating + '</td>' +
                '<td>' + doc.BoxOffice + '</td>' +
                '<td>' + doc.Production + '</td>' +
                '</tr>';
            movies.append(row);
        }
    }).catch(err => {
        console.error(err)
    });
}

const client = stitch.Stitch.initializeDefaultAppClient(APP_ID);
let hasRedirectResult = client.auth.hasRedirectResult();

if (hasRedirectResult) {
    client.auth.handleRedirectResult().then(() => {
        const db = client.getServiceClient(stitch.RemoteMongoClient.factory, ATLAS_SERVICE).db('stitch');
        collStats = db.collection('movies_stats');
        collMovies = db.collection('movies');
        initStats();
        updateStats();
        fetch_movies();
    });
} else {
    const credential = new stitch.GoogleRedirectCredential();
    client.auth.loginWithRedirect(credential);
}