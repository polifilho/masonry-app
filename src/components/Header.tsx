import styled from 'styled-components';

const HeaderWrapper = styled.header`
  padding: 1rem;
  background-color: #222;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
`;

export const Header = () => {
  return <HeaderWrapper>Masonry App Gallery</HeaderWrapper>;
};
