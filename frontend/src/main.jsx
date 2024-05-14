import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import store, { persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/main.css';
import {
  TaskUpdateTimestampProvider,
} from './providers/TaskUpdateTimestampProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <TaskUpdateTimestampProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </TaskUpdateTimestampProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
</React.StrictMode>);
