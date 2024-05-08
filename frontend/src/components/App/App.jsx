import { Route, Routes } from 'react-router-dom';
import { AboutPage, HomePage } from '../../pages/index.js';
import Layout from '../Layout/index.js';
import SignInForm from '../../pages/SignInForm.jsx';
import SignUpForm from '../../pages/SignUpForm.jsx';
import TasksPage from '../../pages/TasksPage.jsx';
import { useEffect } from 'react';
import API from '../../utils/api.js';

function App() {
  useEffect(() => {
    (async () => {
      console.log(await API.auth.login({
        username: '111111',
        password: '111111',
      }));
    })();
  }, []);

  return (<Routes>
    <Route path={'/'} element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={'about'} element={<AboutPage />} />
      <Route path={'tasks'} element={<TasksPage />} />
      <Route path={'signin'} element={<SignInForm />} />
      <Route path={'signup'} element={<SignUpForm />} />
    </Route>
  </Routes>);
}

export default App;
