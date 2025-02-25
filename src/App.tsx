import { Route, Routes } from 'react-router-dom';
import { Articles } from './Pages/Articles';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Articles />} />
    </Routes>
  );
}

export default App;
