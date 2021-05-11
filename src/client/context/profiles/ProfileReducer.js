import { GET_PROFILES, GET_PROFILE, SET_LOADER, SET_ERROS } from '../types';

const ProfileReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };

    case SET_LOADER:
      return {
        ...state,
        loader: payload,
      };

    case SET_ERROS:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
