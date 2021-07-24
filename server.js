const express = require("express");
const app = express();
const { toBase62, toBase10 } = require("./lib/base.js");
const {
    databaseLinkInsert,
    databaseLinkRetrieve
} = require("./lib/database.js");

const WEBPACK_PROXY_PORT = 3000;

// setup express
app.use(express.json());
const listener = app.listen(WEBPACK_PROXY_PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

// requesting an encoded url
app.post("/api/encode", function (request, response) {
    databaseLinkInsert(request.body.entry)
        .then((id) => {
            // return encoded
            response.send(JSON.stringify({
                status: 1,
                link: toBase62(id)
            }));
        })
        .catch(() => {
            response.send(JSON.stringify({
                status: 0,
                link: null
            }));
        });
});

// user navigates to encoded url
app.get("/api/:encoded", (request, response) => {
    databaseLinkRetrieve(toBase10(request.params.encoded))
        .then((url) => {
            response.redirect(url ? `https://${url}` : "/");
        })
        .catch((err) => {
            response.redirect("/");
        });
});
