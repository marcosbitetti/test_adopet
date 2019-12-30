import React from 'react';
import { Spin } from 'antd';

import logo from './logo.svg';
import './App.css';

import { useLoggedStatus, getCredentials } from './services/services';

const App: React.FC = () => {

  const logged = useLoggedStatus();

  return (
    <div className="App">

      {!logged &&
        <div className="not-logged-container">
          <Spin size="large" />
          <h5>Retrieving credentials, just a moment...</h5>
        </div>
      }
      
      {logged &&
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      }
    </div>
  );
}


export default App;
