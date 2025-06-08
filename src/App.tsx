import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Header, Spinner } from './components';

import './App.css';

const Gallery = lazy(() => import('./pages/Gallery'));
const PhotoDetails = lazy(() => import('./pages/PhotoDetails'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/search" element={<Gallery />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
