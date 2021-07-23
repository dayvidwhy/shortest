// init project
var express = require("express");
var app = express();
app.use(express.json());

const WEBPACK_PROXY_PORT = 3000;

// listen for requests
const listener = app.listen(WEBPACK_PROXY_PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

// start database
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:", (err, info) => {
    if (err) {
        console.log("Failed to start database.");
        process.exit(1);
    }
});

// setup database
db.run("CREATE TABLE IF NOT EXISTS links (url TEXT)", (err, info) => {
    if (err) {
        // failed to open database
        console.log("Failed to create table in database.");
        process.exit(1);
    }
});

// convert number back to base 62
const toBase62 = (num) => {
    const base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const baseIndex = num % 62 ;

    // pick first number
    let result = base[baseIndex];
    let q = Math.floor(num / 62);

    // while our value is not 0
    while (q) {
        let r = q % 62;
        q = Math.floor(q / 62);
        result = base[r] + result;
    }

    // final result
    return result;
}

// Convert the shortened URL from base 62 back to base 10
const toBase10 = (num) => {
    const base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    num += "";
    const limit = num.length;
    let result = base.indexOf(num[0]);
    for (let i = 1; i < limit; i++) {
        result = 62 * result + base.indexOf(num[i]);
    }
    return result;
}

// requesting an encoded url
app.post("/api/encode", function (request, response) {
    // add link to the database
    db.run(
        "INSERT INTO links VALUES ($link)",
        {
            $link: request.body.entry
        },
        function (err) {
            if (err) {
                response.send(JSON.stringify({
                    status: 0,
                    link: null
                }));
            } else {
                const lastID = this.lastID;
                // return encoded
                response.send(JSON.stringify({
                    status: 1,
                    link: toBase62(lastID)
                }));
            }
        }
    );
});

// user navigates to encoded url
app.get("/api/:encoded", (request, response) => {
    // get from database
    const rowID = toBase10(request.params.encoded);
    db.get(
        "SELECT url FROM links WHERE (rowID = $rowID)",
        {
            $rowID: rowID
        },
        (err, row) => {
            console.log("About to redirect");
            response.redirect(row ? `https://${row.url}` : "/");
        }
    );
});
