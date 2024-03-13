import styled from "@emotion/styled";

type ColumnProps = {
    cols: number;
    offset: number;
};

const Column = styled.div<ColumnProps>((props) => {
    return ({
        width: `${(props.cols / 12) * 100}%`,
        marginLeft: `${(props.offset / 12) * 100}%`,
        float: "left",
        "@media (max-width: 550px)": {
            width: "100%",
            marginLeft: 0
        }
    });
});

export default Column;
