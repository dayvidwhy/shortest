import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Anchor = styled.a`
    text-decoration: none;
`;

interface LinkProps {
    destination: string;
    children: React.ReactNode;
}

const Link = ({ destination, children }: LinkProps): JSX.Element => {
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
