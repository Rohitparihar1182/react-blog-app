import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom'
import { StoreProvider } from 'easy-peasy';
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <App/>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
