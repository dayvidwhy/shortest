const express = require("express");
const app = express();
const { toBase62, toBase10 } = require("./lib/base.js");
const {
    databaseLinkInsert,
    databaseLinkRetrieve
} = require("./lib/database.js");
const { validatedAddress } = require("./lib/validate.js");

// app is served off this path
const BASE_URL = "/";

// setup express
app.use(express.json());
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

// requesting an encoded url
app.post("/api/encode", function (request, response) {
    // throw 403 if no entry is received
    if (request.body.entry === undefined) {
        return response.status(403).end();
    }

    const validUrl = validatedAddress(request.body.entry);

    // if inputs are invalid throw 422
    if (!validUrl) {
        return response.status(422).end();
    }

    databaseLinkInsert(validUrl)
        .then((id) => {
            // return encoded
            response.json({
                link: toBase62(id)
            });
        })
        .catch(() => {
            // if our code fails throw 500
            return response.status(500).end();
        });
});

// user navigates to encoded url
app.get("/api/:encoded", (request, response) => {
    databaseLinkRetrieve(toBase10(request.params.encoded))
        .then((url) => {
            response.redirect(url ? url : BASE_URL);
        })
        .catch((err) => {
            response.redirect(BASE_URL);
        });
});

// when serving the app in production, express will
// also serve up the built project
if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist"))

    // all other routes send to base app
    app.get("*", (request, response, next) => {
        response.redirect(BASE_URL);
    });
}
