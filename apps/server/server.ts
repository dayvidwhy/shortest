import express from "express";
import { toBase62, toBase10 } from "@shortest/base";
import {
    databaseLinkInsert,
    databaseLinkRetrieve
} from "@shortest/database";

import { validatedAddress } from "@shortest/validate";

const app = express();

const port = process.env.PORT || 3000;

// app is served off this path
const BASE_URL = "/";

// setup express
app.use(express.json());
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});

// requesting an encoded url
app.post("/api/encode", function (request, response) {
    // throw 403 if no entry is received
    if (request.body.entry === undefined) {
        return response.status(403).end();
    }

    const longUrl = request.body.entry;

    // if inputs are invalid throw 422
    if (!validatedAddress(longUrl)) {
        return response.status(422).end();
    }

    databaseLinkInsert(longUrl)
        .then((id) => {
            // return encoded
            response.json({
                link: toBase62(id + "")
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
        .catch(() => {
            response.redirect(BASE_URL);
        });
});

// when serving the app in production, express will
// also serve up the built project
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/dist"))

    // all other routes send to base app
    app.get("*", (request, response) => {
        response.redirect(BASE_URL);
    });
}
