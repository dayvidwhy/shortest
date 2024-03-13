import sqlite from "sqlite3";

const sqlite3 = sqlite.verbose();

// start database
const database = new sqlite3.Database(":memory:", (err) => {
    if (err) {
        console.log("Failed to start database.");
        process.exit(1);
    }
});

const createTable = (table: string): Promise<void> => {
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
export const databaseLinkInsert = (link: string): Promise<number> => {
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
export const databaseLinkRetrieve = (id: number): Promise<string> => {
    return new Promise((res, rej) => {
        return createTable("links")
            .then(() => {
                return database.get(
                    "SELECT url FROM links WHERE (rowID = $rowID)",
                    {
                        $rowID: id
                    },
                    function (err, row: { url: string } | undefined) {
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
