import { Route, Routes } from 'react-router-dom';
import { AboutPage, HomePage } from '../../pages/index.js';
import Layout from '../Layout/index.js';
import SignInForm from '../../pages/SignInForm.jsx';
import SignUpForm from '../../pages/SignUpForm.jsx';
import TasksPage from '../../pages/TasksPage.jsx';
import { useEffect } from 'react';
import API from '../../utils/api.js';
import PrivateRoute from '../PrivateRoute/index.js';
import ProtectedRoute from '../ProtectedRoute/index.js';

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
      <Route path={'tasks'} element={<PrivateRoute component={<TasksPage />}
                                                   redirectTo={'/signin'} />} />
      <Route path={'signin'} element={<ProtectedRoute component={<SignInForm />}
                                                      redirectTo={'/'} />} />
      <Route path={'signup'} element={<ProtectedRoute component={<SignUpForm />}
                                                      redirectTo={'/'} />} />
    </Route>
  </Routes>);
}

export default App;
