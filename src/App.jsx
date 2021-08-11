import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import FooterMenu from './components/layout/FooterMenu';
import ProtectedRoute from './components/route/ProtectedRoute';

export const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  history.replace(appState?.returnTo || window.location.pathname);
};

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE}
      scope={import.meta.env.VITE_AUTH0_SCOPE}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute exact path='/profile' component={Profile} />
        </Switch>
        <FooterMenu />
      </Router>
    </Auth0Provider>
  );
}

export default App;
