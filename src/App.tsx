import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';

const Gallery = lazy(() => import('./pages/Gallery'));
const PhotoDetails = lazy(() => import('./pages/PhotoDetails'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
