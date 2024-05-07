import { Route, Routes } from 'react-router-dom';
import { AboutPage, HomePage } from '../../pages/index.js';
import Layout from '../Layout/index.js';
import SignInForm from '../../pages/SignInForm.jsx';
import TasksPage from '../../pages/TasksPage.jsx'; // Импортируйте компонент SignInForm

function App() {
  return (<Routes>
    <Route path={'/'} element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={'about'} element={<AboutPage />} />
      <Route path={'tasks'} element={<TasksPage />} />
      <Route path={'signin'} element={<SignInForm />} />
    </Route>

  </Routes>);
}

export default App;
