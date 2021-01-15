import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import PageHeader from '../PageHeader/PageHeader';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import LoginPage from '../LoginPage/LoginPage';
import { registerUser, loginClient } from '../../client/client';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009b4f',
    },
    secondary: {
      main: '#009a9b',
    },
  },
});
function App() {
  const [user, setUser] = useState(false);

  const handleSetUser = (user) => {
    setUser(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <div className='App'>
          <PageHeader user={user} />
          <Switch>
            <Route exact path='/' component={LandingPage} user={user} />
            <Route path='/register'>
              <RegistrationPage registerUser={registerUser} user={user} />
            </Route>
            <Route path='/login'>
              <LoginPage
                user={user}
                loginClient={loginClient}
                handleLogin={handleSetUser}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
