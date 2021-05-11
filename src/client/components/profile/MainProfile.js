import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ProfileContext from '../../context/profiles/ProfileContext';
import ListProfiles from './ListProfiles';
import CreateProfile from './CreateProfile';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '95%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MainProfile() {
  const {
    profiles,
    profile,
    loader,
    getProfiles,
    setProfile,
    setLocalProfile,
    updateProfile,
    removeProfile,
  } = useContext(ProfileContext);
  const classes = useStyles();

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {loader ? (
          'loading'
        ) : (
          <div className={classes.container}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Typography variant='h3' component='h2' gutterBottom>
                  Crear nuevo perfil
                </Typography>
                <CreateProfile setProfile={setProfile} />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <ListProfiles
                  profiles={profiles}
                  profile={profile}
                  setLocalProfile={setLocalProfile}
                  getProfiles={getProfiles}
                  updateProfile={updateProfile}
                  removeProfile={removeProfile}
                />
              </Paper>
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default MainProfile;
