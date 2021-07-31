import React, { FC } from "react";
import styled from "@emotion/styled";

// our components
import Type from "@/components/Type";
import Link from "@/components/Link";
import { GridFluid } from "@/layout/Grid";
import Row from "@/layout/Row";
import Alignment from "@/layout/Alignment";

const Spacer = styled.div`
    margin: 10 0 10 0;
`;

const GridBanner = styled(GridFluid)`
    background-color: #4f79a2;
`.withComponent("header");

const BannerType = styled(Type)`
    width: 100%;
    font-size: 1.1em;
    color: #FFF;
    margin: 10px 0;
    &:hover {
        color: #2ecc71;
    }
`;

const Banner: FC = () => {
    return (
        <GridBanner>
            <Row>
                <Alignment
                    alignment={"center"}>
                    <Spacer>
                        <Link
                            destination="http://davidyoung.tech">
                            <BannerType
                                element="span">
                                Made by davidyoung.tech
                            </BannerType>
                        </Link>
                    </Spacer>
                </Alignment>
            </Row>
        </GridBanner>
    );
};

export default Banner;
