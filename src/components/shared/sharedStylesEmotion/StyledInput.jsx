import styled from "@emotion/styled";

import {
  white,
  darkPurple,
  lightGrey,
  lightPurple,
} from "components/shared/sharedStylesEmotion/colors";

export const StyledInput = styled.input`
  background-color: ${({ darkMode }) => (darkMode ? darkPurple : white)};
  border: 1px solid ${({ darkMode }) => (darkMode ? lightPurple : lightGrey)};
  border-radius: 0.3rem;
  color: ${({ darkMode }) => (darkMode ? white : darkPurple)};
  padding: 0.8rem 1rem;
  margin-top: 0.4rem;
  outline: ${({ darkMode }) => !darkMode && "none"};
`;
