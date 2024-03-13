import styled from "@emotion/styled";

export const GridFluid = styled.div`
    width: 100%;
    overflow: auto;
`;

export const GridContainer = styled.div`
    width: 960px;
    margin: auto;
    @media (max-width: 960px) {
        width: 90%;
        margin:auto;
    }
`;
