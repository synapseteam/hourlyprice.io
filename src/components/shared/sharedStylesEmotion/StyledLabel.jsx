import styled from "@emotion/styled";

const blue = "#5599ec";
const purple = "#24274a";

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  color: ${({ darkMode }) => (darkMode ? blue : purple)};
  margin-top: 1.6rem;

  &:first-child {
    margin-top: 0;
  }
`;
