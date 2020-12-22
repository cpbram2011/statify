
import { LOGIN } from '../actions/spotify_actions';

const initialState = {
isAuthenticated: false,
accessToken: {}
};

export default function(state = initialState, action) {
switch (action.type) {
  case LOGIN:
    return {
      isAuthenticated: true,
      accessToken: action.accessToken
    }

  default:
 return state;
}
}