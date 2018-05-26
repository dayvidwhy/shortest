// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// setup static directory
app.use(express.static('public'));

// start database
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// setup database
db.serialize(function () {
    if (!exists) {
        db.run('CREATE TABLE IF NOT EXISTS links (url TEXT)');
    }
});

// default view
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

// requesting an encoded url
app.post("/encode", function (request, response) {
    // convert number back to base 62
    function toBase62(num) {
        const base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
    console.log(request.body.link);
    // put link in database
    db.run(
        "INSERT INTO links VALUES ($link)",
        {
            $link: request.body.link
        },
        function (err, info) {
            var that = this;
            console.log(that.lastID);
            // return encoded
            response.send(JSON.stringify({
                status: 1,
                link: toBase62(that.lastID)
            }));
        }
    );
});

// user navigates to encoded url
app.get("/:encoded", function (request, response) {
    // Convert the shortened URL from base 62 back to base 10
    function toBase10(num) {
        const base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        num += '';
        const limit = num.length;
        let result = base.indexOf(num[0]);
        for (let i = 1; i < limit; i++) {
            result = 62 * result + base.indexOf(num[i]);
        }
        return result;
    }

    var rowID = toBase10(request.params.encoded);
    console.log(rowID);
    db.get(
        "SELECT url FROM links WHERE (rowID = $rowID)",
        {
            $rowID: rowID
        },
        function (err, row) {
            var that = this;
            console.log(err);
            console.log(row.url);
            response.redirect(row.url);
        }
    );
});

// listen for requests
var listener = app.listen(7000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
