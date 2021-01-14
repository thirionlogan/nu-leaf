import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonGroup } from '@material-ui/core'

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

function PageHeader(props) {
  const classes = useStyles();

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
          <ButtonGroup size="small" color="secondary" variant="contained">
            <Button component={RouterLink} to='/search' >Search</Button>
            <Button component={RouterLink} to='/login' >Login</Button>
            <Button component={RouterLink} to='/' >Log Out</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PageHeader;
