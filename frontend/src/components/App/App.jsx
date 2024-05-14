import { Route, Routes } from 'react-router-dom';
import { AboutPage, HomePage } from '../../pages/index.js';
import Layout from '../Layout/index.js';
import SignInForm from '../../pages/SignInForm.jsx';
import SignUpForm from '../../pages/SignUpForm.jsx';
import TasksPage from '../../pages/TasksPage.jsx';
import Groups from '../../pages/Groups.jsx';
import MyGroups from '../../pages/MyGroups.jsx';
import { useEffect } from 'react';
import API from '../../utils/api.js';
import PrivateRoute from '../PrivateRoute/index.js';
import ProtectedRoute from '../ProtectedRoute/index.js';
import toast from 'react-hot-toast';

function App() {
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
      <Route path={'groups'} element={<ProtectedRoute component={<Groups />}
                                                      redirectTo={'/'} />} />
      <Route path={'my-groups'}
             element={<ProtectedRoute component={<MyGroups />}
                                      redirectTo={'/'} />} />
    </Route>
  </Routes>);
}

export default App;
