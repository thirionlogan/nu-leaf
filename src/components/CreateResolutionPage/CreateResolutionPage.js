import React, { useEffect, useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function CreateResolutionPage({ user, createResolution }) {
  const classes = useStyles();

  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [contentError, setContentError] = useState('');

  useEffect(() => {
    setContentError('');
  }, [content]);

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setContentError('Resolution is required');
    }

    const noErrors = content.trim();

    if (noErrors) {
      createResolution({ content });
      setRedirect(true);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      {/* {user ? null : <Redirect to='/login' />} */}
      {redirect ? <Redirect to='/home' /> : null}
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Create Resolution
        </Typography>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            autoComplete='fname'
            name='content'
            variant='outlined'
            required
            fullWidth
            id='content'
            label='Resolution'
            value={content}
            onChange={handleChangeContent}
            autoFocus
            helperText={contentError}
            error={!!contentError}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
            component={RouterLink}
            to='/home'
          >
            Create Resolution
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default CreateResolutionPage;
