const express = require("express");
const app = express();
const { toBase62, toBase10 } = require("./lib/base.js");
const {
    databaseLinkInsert,
    databaseLinkRetrieve
} = require("./lib/database.js");
const { validatedAddress } = require("./lib/validate.js");

// setup express
app.use(express.json());
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

// requesting an encoded url
app.post("/api/encode", function (request, response) {
    const validUrl = validatedAddress(request.body.entry);
    if (!validUrl) {
        return response.json({
            status: 0,
            link: null
        });
    }

    databaseLinkInsert(validUrl)
        .then((id) => {
            // return encoded
            response.json({
                status: 1,
                link: toBase62(id)
            });
        })
        .catch(() => {
            response.json({
                status: 0,
                link: null
            });
        });
});

// user navigates to encoded url
app.get("/api/:encoded", (request, response) => {
    databaseLinkRetrieve(toBase10(request.params.encoded))
        .then((url) => {
            response.redirect(url ? url : "/");
        })
        .catch((err) => {
            response.redirect("/");
        });
});

// when serving the app in production, express will
// also serve up the built project
if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist"))
}
