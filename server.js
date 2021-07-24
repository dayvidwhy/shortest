const express = require("express");
const app = express();
const { toBase62, toBase10 } = require("./lib/base.js");
const { database } = require("./lib/database.js");

const WEBPACK_PROXY_PORT = 3000;

// setup express
app.use(express.json());
const listener = app.listen(WEBPACK_PROXY_PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

// requesting an encoded url
app.post("/api/encode", function (request, response) {
    database.run(
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
    database.get(
        "SELECT url FROM links WHERE (rowID = $rowID)",
        {
            $rowID: toBase10(request.params.encoded)
        },
        function (err, row) {
            if (err) {
                response.redirect("/");
            } else {
                response.redirect(row ? `https://${row.url}` : "/");
            }
        }
    );
});
