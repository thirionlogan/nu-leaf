import React, { useEffect, useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Container, Fab } from '@material-ui/core';
import Resolution from '../Resolution/Resolution';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(10),
  },
  root: {
    padding: theme.spacing(3),
  },
}));

function HomePage({ user, getAllResolutions }) {
  const classes = useStyles();
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    getAllResolutions().then(({ data }) => {
      console.log(data);
      setResolutions(data);
    });
  }, [getAllResolutions]);

  return (
    <div className={classes.root}>
      {user ? null : <Redirect to='/login' />}
      <Container component='main' maxWidth='sm'>
        {resolutions.map((resolution) => (
          <Resolution resolution={resolution} />
        ))}
      </Container>
      <Fab
        className={classes.fab}
        color='primary'
        aria-label='add'
        component={RouterLink}
        to='/createResolution'
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default HomePage;
