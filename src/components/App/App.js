import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import PageHeader from '../PageHeader/PageHeader';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import LoginPage from '../LoginPage/LoginPage'
import UserPosts from '../UserPosts/UserPosts'

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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <div className='App'>
          <PageHeader />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/register' component={RegistrationPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/userposts' component={UserPosts} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
