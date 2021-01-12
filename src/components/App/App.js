import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import PageHeader from '../PageHeader/PageHeader';

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
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
