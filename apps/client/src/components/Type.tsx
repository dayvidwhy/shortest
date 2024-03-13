import React from "react";
import styled from "@emotion/styled";

const HeaderSecond = styled.h2`
    font-size: 3rem;
    font-weight: 300;
    color: #ecf0f1;
    margin: 50px 0 10px 0;
    @media (max-width: 550px) {
        font-size: 1.7rem;
    }
`;

const HeaderThird = styled.h3`
    font-size: 1.4rem;
    font-weight: 200;
    margin: 10px 0;
    color: #ecf0f1;
`;

const Paragraph = styled.p`
    font-size: 1.1em;
    line-height: 130%;
`;

interface TypeProps {
    element: string;
    children: React.ReactNode;
    className?: string;
}

const Type = ({ element, children, className }: TypeProps): JSX.Element => {
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
    return <span></span>;
};

export default Type;
