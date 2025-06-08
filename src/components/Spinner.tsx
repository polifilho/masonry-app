import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const SpinnerIcon = styled.div`
  border: 4px solid #ccc;
  border-top: 4px solid #222;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const Spinner = () => (
  <SpinnerWrapper>
    <SpinnerIcon />
  </SpinnerWrapper>
);

export default Spinner;
