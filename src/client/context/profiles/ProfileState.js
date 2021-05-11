import React, { useReducer } from 'react';
import ProfileReducer from './ProfileReducer';
import ProfileContext from './ProfileContext';
import { GET_PROFILES, GET_PROFILE, SET_LOADER, SET_ERROS } from '../types';

const ProfileState = props => {
  const initialState = {
    profile: null,
    profiles: [],
    loader: false,
    errors: {},
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const getProfiles = async id => {
    setLoader(true);

    if (id) {
      await fetch(`/api/profiles/${id}`)
        .then(res => res.json())
        .then(data =>
          dispatch({
            type: GET_PROFILE,
            payload: data.data,
          })
        )
        .catch(e => console.error(e));
    } else {
      await fetch('/api/profiles')
        .then(res => res.json())
        .then(data =>
          dispatch({
            type: GET_PROFILES,
            payload: data.data,
          })
        )
        .catch(e => console.error(e));
    }

    setLoader(false);
  };

  const setProfile = async data => {
    setLoader(true);
    await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          getProfiles();
        } else {
          setErros(data);
        }
      })
      .catch(e => console.error(e))
      .finally(() => setLoader(false));
  };

  const updateProfile = async (data, id) => {
    setLoader(true);

    await fetch(`/api/profiles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          getProfiles();
        } else {
          setErros(data);
        }
      })
      .catch(e => console.error(e))
      .finally(() => setLoader(false));
  };

  const removeProfile = async id => {
    console.log('remove profile', id);
    await fetch(`/api/profiles/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 202) {
          getProfiles();
          setLocalProfile(null);
        } else {
          setErros(data);
        }
      })
      .catch(e => console.error(e))
      .finally(() => setLoader(false));
  };

  const setLocalProfile = data =>
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });

  const setLoader = param =>
    dispatch({
      type: SET_LOADER,
      payload: param,
    });

  const setErros = data =>
    dispatch({
      type: SET_ERROS,
      payload: param,
    });

  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        profiles: state.profiles,
        loader: state.loader,
        errors: state.errors,
        getProfiles,
        setProfile,
        setLocalProfile,
        updateProfile,
        removeProfile,
        setLoader,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
