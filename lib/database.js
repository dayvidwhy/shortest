const sqlite3 = require("sqlite3").verbose();

// start database
const database = new sqlite3.Database(":memory:", (err, info) => {
    if (err) {
        console.log("Failed to start database.");
        process.exit(1);
    }
});

// setup database
database.run("CREATE TABLE IF NOT EXISTS links (url TEXT)", (err, info) => {
    if (err) {
        // failed to open database
        console.log("Failed to create table in database.");
        process.exit(1);
    }
});

// store the url in the database
module.exports.databaseLinkInsert = (link) => {
    return new Promise((res, rej) => {
        database.run(
            "INSERT INTO links VALUES ($link)",
            {
                $link: link
            },
            function (err) {
                if (err) {
                    rej(err)
                } else {
                    res(this.lastID);
                }
            }
        );
    });
};

// fetch the url from the database
module.exports.databaseLinkRetrieve = (id) => {
    return new Promise((res, rej) => {
        database.get(
            "SELECT url FROM links WHERE (rowID = $rowID)",
            {
                $rowID: id
            },
            function (err, row) {
                if (err) {
                    rej();
                } else {
                    res(row.url);
                }
            }
        );
    });
};
