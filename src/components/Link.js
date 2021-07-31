import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Anchor = styled.a`
    text-decoration: none;
`;

const Link = ({ destination, children }) => {
    return (
        <Anchor href={destination}>
            {children}
        </Anchor>
    );
};

Link.propTypes = {
    destination: PropTypes.string,
    children: PropTypes.element
};

export default Link;
