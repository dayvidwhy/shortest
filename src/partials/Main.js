import React, { useState } from "react";
import Type from "@/components/Type.js";
import { validatedAddress } from "@/utils/validate.js";

const APP_URL = (() => {
    if (process.env.NODE_ENV === "development") {
        return "localhost:8080";
    } else {
        return process.env.PROJECT_DOMAIN ? `https://${process.env.PROJECT_DOMAIN}.glitch.me` : "localhost:3000";
    }
})();

// go get a short url
const submit = (event, entry, setEntry) => {
    event.preventDefault();

    // can't be empty
    if (!validatedAddress(entry)) {
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
            <div className="row hero-row center">
                <Type element="h2">
                    Shorten a link in a single click
                </Type>
                <Type element="h3">
                    And quite possibly get back something shorter.
                </Type>
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
                            value="Make it happen" />
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Main;
