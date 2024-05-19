import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import store, { persistor } from './redux/store';
import './i18n';
import './styles/main.css';
import {
  TaskUpdateTimestampProvider,
} from './providers/TaskUpdateTimestampProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <TaskUpdateTimestampProvider>
        <BrowserRouter>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </TaskUpdateTimestampProvider>
    </PersistGate>
  </Provider>
</React.StrictMode>);
