import React from 'react';
import {
  Container,
  Typography,
  Divider,
  makeStyles,
  Button,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageHeader: {
    width: '100vw',
    height: 'calc(50vh - 64px)',
    backgroundImage:
      'url("https://images.squarespace-cdn.com/content/v1/55ca9da9e4b00b848202d413/1440034742845-KIWAKNTZL0WBORCIU00J/ke17ZwdGBToddI8pDm48kFyD7pzB8zoMIVY5aiUuFlp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0jG2lbcDYBOeMi4OFSYem8DMb5PTLoEDdB05UqhYu-xbnSznFxIRsaAU-3g5IaylIg/lightstock_227019_medium_callie_.jpg?format=1500w")',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    marginBottom: '24px',
    padding: '80px',
  },
}));

function LandingPage(props) {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Typography
        component='div'
        align='center'
        variant='h3'
        className={classes.imageHeader}
      >
        <Box fontWeight='fontWeightMedium'>
          Time to accomplish your resolutions for the new year.
        </Box>
      </Typography>
      <Container maxWidth='lg'>
        <Typography align='center' variant='h5' gutterBottom>
          Fewer than{' '}
          <Typography color='primary' variant='h4' component='span'>
            8%
          </Typography>{' '}
          of people actually stick to their New Years Resolutions.
        </Typography>
        <Container maxWidth='sm'>
          <Typography align='center' color='primary' variant='h4'>
            Join us and become part of the triumphant few.
          </Typography>
          <Divider />
        </Container>
        <Typography align='center' variant='h3' color='primary' gutterBottom>
          NuLeaf
        </Typography>
        <Container maxWidth='xs' className={classes.buttonContainer}>
          <Button variant='contained' color='primary'>
            Sign up today
          </Button>
        </Container>
      </Container>
    </main>
  );
}

export default LandingPage;
