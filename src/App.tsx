import { Routes, Route } from 'react-router-dom';
import { ArticlesPage } from './Pages';
import { Layout } from './components';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
