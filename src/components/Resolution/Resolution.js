import React, { useState } from 'react';
import { Paper, Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  upperContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  buttonGroup: { width: '100%', paddingLeft: theme.spacing(8) },
  avatar: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Resolution({ resolution }) {
  const classes = useStyles();
  const [favorited, setFavorited] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleFavorited = () => {
    setFavorited(!favorited);
  };
  const handleBookmarked = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.upperContent}>
        <Avatar className={classes.avatar} />
        {resolution?.content}
      </div>
      <div className={classes.buttonGroup}>
        <IconButton
          aria-label='favorite'
          size='small'
          onClick={handleFavorited}
        >
          {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        {favorited ? '1' : '0'}
        <IconButton
          aria-label='bookmark'
          size='small'
          onClick={handleBookmarked}
        >
          {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
        {bookmarked ? '1' : '0'}
      </div>
    </Paper>
  );
}

export default Resolution;
