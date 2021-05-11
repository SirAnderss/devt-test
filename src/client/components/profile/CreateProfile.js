import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    maxWidth: '50ch',
  },
  button: { marginTop: 20 },
}));

const CreateProfile = props => {
  const [profile, setProfile] = useState({
    fullName: '',
    document: '',
    phoneNumber: '',
    address: '',
  });

  const classes = useStyles();

  const handleChange = e => {
    const { name, value } = e.target;

    setProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setDataProfile = () => {
    if (props.profile) {
      setProfile({
        fullName: props.profile.fullName,
        document: props.profile.document,
        phoneNumber: props.profile.phoneNumber,
        address: props.profile.address,
      });
    }
  };

  useEffect(() => {
    setDataProfile();
  }, []);

  return (
    <div className={classes.root}>
      <TextField
        required
        id='fullName'
        name='fullName'
        label='Nombre completo'
        fullWidth
        value={profile.fullName}
        onChange={handleChange}
      />
      <TextField
        required
        id='document'
        name='document'
        label='Documento'
        fullWidth
        type='number'
        value={profile.document}
        onChange={handleChange}
      />
      <TextField
        required
        id='phoneNumber'
        name='phoneNumber'
        label='Teléfono'
        fullWidth
        type='number'
        value={profile.phoneNumber}
        onChange={handleChange}
      />
      <TextField
        required
        id='address'
        name='address'
        label='Dirección'
        fullWidth
        value={profile.address}
        onChange={handleChange}
      />
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={() =>
          props.setProfile(profile, props.profile ? props.profile._id : null)
        }
      >
        {props.profile ? 'Actualizar' : 'Guardar'}
      </Button>
    </div>
  );
};

export default CreateProfile;
