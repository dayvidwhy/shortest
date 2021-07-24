import React from "react";

const Link = ({ destination, children }) => {
    return (
        <a href={destination}>
            {children}
        </a>
    );
};

export default Link;
