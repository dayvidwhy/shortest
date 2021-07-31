import styled from "@emotion/styled";

const Column = styled.div(props => {
    return ({
        width: `${(props.cols / 12) * 100}%`,
        marginLeft: `${(props.offset / 12) * 100}%`,
        float: "left",
        '@media (max-width: 550px)': {
            width: "100%",
            marginLeft: 0
        }
    });
});

export default Column;
