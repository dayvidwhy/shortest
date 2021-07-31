import React from "react";
import Type from "@/components/Type.js";
import Link from "@/components/Link.js";
import styled from "@emotion/styled";

const Header = styled.header`
    background-color: #4f79a2;
`;

const Banner = () => {
    return (
        <Header className="grid-fluid">
            <div className="row center space">
                <Link destination="http://davidyoung.tech">
                    <Type className="banner-text banner-link" element="span">
                        Made by davidyoung.tech
                    </Type>
                </Link>
            </div>
        </Header>
    );
};

export default Banner;
