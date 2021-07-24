import React, { useState } from "react";

const APP_URL = (() => {
    if (process.env.NODE_ENV === "development") {
        return "localhost:8080";
    } else {
        return "production site";
    }
})();

// go get a short url
const submit = (event, entry, setEntry) => {
    event.preventDefault();

    // can't be empty
    if (entry === "" || entry === null) {
        setEntry("Enter a url first.");
        return;
    }

    // make the request
    setEntry("Working on it.");

    // encode the url
    fetch("/api/encode", {
        method: 'POST',
        body: JSON.stringify({ entry }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 1) {
                setEntry(APP_URL + "/api/" + data.link);
            } else {
                setEntry("Error handling the request.");
            }
        })
        .catch(() => {
            setEntry("Error handling request.");
        });
};

const Main = () => {
    const [entry, setEntry] = useState("");

    return (
        <main className="grid-container">
            <div className="row hero-row">
                <h2 className="center">
                    Shorten a link in a single click
                </h2>
                <h3 className="center">
                    And quite possibly get back something shorter.
                </h3>
            </div>
            <div className="row hero-row center">
                <form
                    onSubmit={e => submit(e, entry, setEntry)}>
                    <input
                        value={entry}
                        onChange={e => setEntry(e.target.value)}
                        type="text"
                        name="searching"
                        maxLength="124"
                        placeholder="Link to shorten" />
                    <div className="col-4 offset-4">
                        <input
                            type="submit"
                            value="Make it happen." />
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Main;
