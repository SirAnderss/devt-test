import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

export default function Profile(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      {props.profile ? (
        <CardContent className={classes.container}>
          <Avatar src={props.profile.avatar} src={props.profile.fullName} />
          <Typography variant='h3' component='h4' gutterBottom>
            {props.profile.fullName}
          </Typography>
          <Typography variant='h5' component='p'>
            {props.profile.document}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {props.profile.phoneNumber}
          </Typography>
          <Typography variant='body2' component='p'>
            {props.profile.address}
          </Typography>
        </CardContent>
      ) : null}
    </Card>
  );
}
