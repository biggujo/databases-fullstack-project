import { Route, Routes } from 'react-router-dom';
import { AboutPage, HomePage } from '../../pages/index.js';
import Layout from '../Layout/index.js';

function App() {
  return (<Routes>
    <Route path={'/'} element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={'about'} element={<AboutPage />} />
    </Route>
  </Routes>);
}

export default App;
