import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'inherit',
    color: 'inherit',
  },
}));

function PageHeader({ user, logoutClient, handleSetUser }) {
  const classes = useStyles();

  const handleLogout = () => {
    logoutClient();
    handleSetUser(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            className={classes.title}
            component={RouterLink}
            to='/'
          >
            NuLeaf
          </Typography>
          {user ? (
            <Button
              variant='contained'
              component={RouterLink}
              to='/login'
              onClick={handleLogout}
            >
              Log Out
            </Button>
          ) : (
            <Button variant='contained' component={RouterLink} to='/login'>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PageHeader;
