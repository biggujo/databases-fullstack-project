import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import App from './components/App';
import store, { persistor } from './redux/store';
import './i18n';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <BrowserRouter>
                        <ChakraProvider>
                            <App />
                        </ChakraProvider>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
    </React.StrictMode>
);
