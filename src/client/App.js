import React from 'react';
import MenuAppBar from './components/MenuAppBar';
import ProfileState from './context/profiles/ProfileState';
import MainProfile from './components/profile/MainProfile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ProfileState>
        <MenuAppBar />
        <MainProfile />
      </ProfileState>
    </div>
  );
};

export default App;
