import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './themes/theme';


import {ChakraProvider} from "@chakra-ui/react"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store,persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import "semantic-ui-css/semantic.min.css"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
