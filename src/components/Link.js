import React from "react";
import PropTypes from "prop-types";

const Link = ({ destination, children }) => {
    return (
        <a href={destination}>
            {children}
        </a>
    );
};

Link.propTypes = {
    destination: PropTypes.string,
    children: PropTypes.element
};

export default Link;
