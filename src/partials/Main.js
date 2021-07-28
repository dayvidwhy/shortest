import React, { useState } from "react";
import Type from "@/components/Type.js";
import { validatedAddress } from "@/utils/validate.js";

const APP_URL = (() => {
    const parsedDomain = new URL(window.location.href);
    return parsedDomain.origin;
})();

// go get a short url
const submit = (entry) => {
    // encode the url
    return new Promise((res, rej) => {
        fetch("/api/encode", {
            method: 'POST',
            body: JSON.stringify({ entry }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json();
            })
            .then((data) => {
                res(APP_URL + "/api/" + data.link);
            })
            .catch(() => {
                rej();
            });
        });
};

const Main = () => {
    const [entry, setEntry] = useState("");
    const [action, setAction] = useState("Make it happen");
    const [placeholder, setPlaceholder] = useState("Link to shorten");
    const actionText = React.useRef();

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
                    onSubmit={event => {
                        event.preventDefault();

                        if (action === "Copy") {
                            actionText.current.select();
                            document.execCommand("copy");
                            return;
                        }

                        // can't be empty
                        if (!validatedAddress(entry)) {
                            setPlaceholder("Enter a url first.");
                            return;
                        }

                        // send the url off for shortening
                        const longUrl = entry;
                        setEntry("");
                        setPlaceholder("Working on it.");
                        submit(longUrl)
                            .then((shortUrl) => {
                                setEntry(shortUrl);
                                setAction("Copy");
                            })
                            .catch(() => {
                                setPlaceholder("Issue shortening the link.");
                            });
                    }}>
                    <input
                        value={entry}
                        onChange={e => {
                            setAction("Make it happen");
                            setEntry(e.target.value);
                        }}
                        type="text"
                        name="searching"
                        ref={actionText}
                        maxLength="124"
                        placeholder={placeholder} />
                    <div className="col-4 offset-4">
                        <input
                            type="submit"
                            value={action} />
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Main;
