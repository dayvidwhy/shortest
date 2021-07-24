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

module.exports.database = database;
