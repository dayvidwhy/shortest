import styled from "@emotion/styled";

type AlignmentProps = {
    alignment: string
};

const Alignment = styled.div<AlignmentProps>`
    text-align: ${(props => props.alignment)}
`;

export default Alignment;
