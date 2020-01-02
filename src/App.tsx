import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
// import { Header, Footer, Sider, Content, Layout, Spin } from 'antd';
import { Layout, Icon } from 'antd';

// local imports
import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';

import { useLoggedStatus } from './services/services';

const { Header, Footer, Content} = Layout;

const App: React.FC = () => {

  const logged = useLoggedStatus();

  return (
    <Router>
      <Layout className="App">
        <Header>
          <Icon type="github" className="icon" />
        </Header>
        <Content>
          <Switch>
            <Route
              path="/login"
              render={ () => <Login /> }
            />
            <Route
              path="/"
              render={ () => !logged ? <Redirect to="/login" /> : <Home /> }
            />
          </Switch>
        </Content>
        <Footer></Footer>
      </Layout>
    </Router>
  );
}


export default App;
