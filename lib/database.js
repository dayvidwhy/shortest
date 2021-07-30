const sqlite3 = require("sqlite3").verbose();

// start database
const database = new sqlite3.Database(":memory:", (err) => {
    if (err) {
        console.log("Failed to start database.");
        process.exit(1);
    }
});

const createTable = (table) => {
    return new Promise((res, rej) => {
        // setup database
        return database.run(`CREATE TABLE IF NOT EXISTS ${table} (url TEXT)`, (err) => {
            if (err) {
                rej();
            } else {
                res();
            }
        });
    });
};

// store the url in the database
module.exports.databaseLinkInsert = (link) => {
    return new Promise((res, rej) => {
        return createTable("links")
            .then(() => {
                return database.run(
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
            })
            .catch(() => {
                rej();
            });
    });
};

// fetch the url from the database
module.exports.databaseLinkRetrieve = (id) => {
    return new Promise((res, rej) => {
        return createTable("links")
            .then(() => {
                return database.get(
                    "SELECT url FROM links WHERE (rowID = $rowID)",
                    {
                        $rowID: id
                    },
                    function (err, row) {
                        if (row) {
                            res(row.url);
                        } else {
                            rej();
                        }
                    }
                );
            })
            .catch(() => {
                rej();
            });
    });
};
