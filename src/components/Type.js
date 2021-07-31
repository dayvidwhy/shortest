import React from "react";
import styled from "@emotion/styled";

const HeaderSecond = styled.h2`
    font-size: 3rem;
    font-weight: 300;
    color: #ecf0f1;
    margin: 50px 0 10px 0;
    letter-spacing: 1px;
    @media (max-width: 550px) {
        font-size: 1.7rem;
    }
`;

const HeaderThird = styled.h3`
    font-size: 1.4rem;
    font-weight: 200;
    margin: 10px 0;
    color: #ecf0f1;
    letter-spacing: 1px;
`;

const Paragraph = styled.p`
    font-size: 1.1em;
    line-height: 130%;
`;

const Type = ({ element, children, className }) => {
    switch (element) {
    case "h2": {
        return (
            <HeaderSecond className={className}>
                {children}
            </HeaderSecond>
        );
    }
    case "h3": {
        return (
            <HeaderThird className={className}>
                {children}
            </HeaderThird>
        );
    }
    case "p": {
        return (
            <Paragraph className={className}>
                {children}
            </Paragraph>
        );
    }
    case "span": {
        return (
            <span className={className}>
                {children}
            </span>
        )
    }
    }
};

export default Type;
