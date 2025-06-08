import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  width: 300px;
`;

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slugified = query.trim().toLowerCase().replace(/\s+/g, '-');
    navigate(`/search?q=${slugified}`);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Buscar imagens"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button type="submit">Buscar</Button>
      </Form>
    </Wrapper>
  );
};
