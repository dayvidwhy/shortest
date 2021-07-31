import React, { useState } from "react";
import styled from "@emotion/styled";

// our components
import Type from "@/components/Type";
import { validatedAddress } from "@/utils/validate";
import { GridContainer } from "@/layout/Grid";
import Row from "@/layout/Row";
import Alignment from "@/layout/Alignment";
import Column from "@/layout/Column";

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

const HeroRow = styled(Row)`
    margin-top: 2rem;
    margin-bottom: 2rem;
    @media (max-width: 550px) {
        margin-top: 3rem;
        margin-bottom: 2rem;
    }
`;

const EntryBox = styled.input`
    width: 80%;
    padding: 12px 20px;
    margin: 8px 0;
    font-size: 1.3em;
    border: 1px solid #ccc;
    box-sizing: border-box;
    @media (max-width: 550px) {
        width: 100%;
    }
`;

const SubmitButton = styled.input`
    width: 100%;
    background-color: rgb(22,188,156);
    color: white;
    padding: 14px 20px;
    font-size: 1.3em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: #3498db;
    }
`;

const Main = () => {
    const [entry, setEntry] = useState("");
    const [action, setAction] = useState("Make it happen");
    const [placeholder, setPlaceholder] = useState("Link to shorten");
    const actionText = React.useRef();

    return (
        <GridContainer>
            <HeroRow>
                <Alignment
                    alignment={"center"}>
                    <Type element="h2">
                        Shorten a link in a single click
                    </Type>
                    <Type element="h3">
                        And quite possibly get back something shorter.
                    </Type>
                </Alignment>
            </HeroRow>
            <HeroRow>
                <Alignment
                    alignment={"center"}>
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
                        <EntryBox
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
                        <Column offset={4} cols={4}>
                            <SubmitButton
                                type="submit"
                                value={action} />
                        </Column>
                    </form>
                </Alignment>
            </HeroRow>
        </GridContainer>
    );
};

export default Main;
