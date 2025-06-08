import { useLocation, useNavigate } from 'react-router-dom';
import type { Photo } from '../types/photo';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Img = styled.img`
  max-width: 100%;
  border-radius: 12px;
`;

const Info = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #444;
`;

const BackButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  background: #222;
  color: white;
  border-radius: 6px;
  cursor: pointer;
`;

const PhotoDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.photo) {
    return <div>Images not found.</div>;
  }

  const photo: Photo = state.photo;

  return (
    <Container>
      <Img src={photo.src.large} alt={photo.alt} />
      <Info>
        <h2>{photo.alt || 'No Title'}</h2>
        <p>Photographer: {photo.photographer}</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </Info>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
    </Container>
  );
};

export default PhotoDetails;
