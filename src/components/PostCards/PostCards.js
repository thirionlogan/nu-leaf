import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PostCards = ({userProps}) => {
  const classes = useStyles();
    console.log("Did this work?") 
    console.log("PostCard stuff", userProps.userAvatar, userProps.userTextTitle, userProps.userResolution) 
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
         <Avatar src={userProps.userAvatar}/> 
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {userProps.userTextTitle || "Text Title"}
        </Typography>
        <Typography variant="body2" component="p">
          {userProps.userResolution || "New Year's Resolution Text"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
} 

export default PostCards;