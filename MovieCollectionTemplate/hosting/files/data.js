const APP_ID = 'moviecollection-vazgz';
const ATLAS_SERVICE = 'mongodb-atlas';
let collStats;
let collMovies;
const statsFilter = {"_id": "movies"};

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
        avg_metascore.text(roundToTwo(movie_stats.avg_metascore));
        avg_metascore_count.text(movie_stats.avg_metascore_count);
        avg_imdbRating.text(roundToTwo(movie_stats.avg_imdbRating));
        avg_imdbRating_count.text(movie_stats.avg_imdbRating_count);
    } else {
        avg_metascore.text("0");
        avg_metascore_count.text("0");
        avg_imdbRating.text("0");
        avg_imdbRating_count.text("0");
    }
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function addNewTitle() {
    const title = $("#title");
    console.log("Adding new title : " + title.val());
    collMovies.insertOne({"Title": title.val()}).then(async result => {
        title.val("");
        const changeStream = await collMovies.watch([result.insertedId]);
        changeStream.onNext(event => {
            console.log('My movie update:', event);
            fetch_movies();
            changeStream.close()
        })
    }).catch(e => console.log("Insert new movie failed.", e));
}

function removeMovie(title) {
    console.log("Removing title : " + title);
    collMovies.deleteMany({"Title": title}).then(() => {
        fetch_movies();
    }).catch(e => console.log("Delete movie failed.", e));
}

function removeAllMovies() {
    console.log("Removing all movies.");
    collMovies.deleteMany({}).then(() => {
        fetch_movies();
    }).catch(e => console.log("Delete all movies failed.", e));
}

function fetch_movies() {
    collMovies.find().toArray().then(docs => {
        console.log("Found movies", docs);
        let movies = $('#movies');
        movies.empty();
        for (let x in docs) {
            movies.append(buildRow(x, docs[x]));
        }
    }).catch(err => {
        console.error(err)
    });
}

function buildRow(index, doc) {
    let columnOrder = ['Title', 'Year', 'Released', 'Released_ISO', 'Runtime', 'Genre', 'Language', 'Metascore', 'imdbRating', 'BoxOffice', 'Production'];

    let tr = document.createElement("tr");

    let th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerText = eval(eval(index) + 1);
    tr.appendChild(th);

    columnOrder.forEach(col => {
        let td = document.createElement("td");
        td.innerText = doc[col];
        tr.appendChild(td);
    });

    let td = document.createElement("td");
    let input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", "Delete");
    input.onclick = () => removeMovie(doc.Title);
    td.appendChild(input);
    tr.appendChild(td);
    return tr;
}
