import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import PageHeader from '../PageHeader/PageHeader';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import {
  registerUser,
  loginClient,
  logoutClient,
  getAllResolutions,
} from '../../client/client';

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
          <PageHeader
            user={user}
            logoutClient={logoutClient}
            handleSetUser={handleSetUser}
          />
          <Switch>
            <Route exact path='/'>
              <LandingPage user={user} />
            </Route>
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
            <Route path='/home'>
              <HomePage user={user} getAllResolutions={getAllResolutions} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
