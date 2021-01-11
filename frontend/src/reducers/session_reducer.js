
import { LOGIN, LOGOUT, RECEIVE_USER_DATA } from '../actions/spotify_actions';

const initialState = {
isAuthenticated: false,
accessToken: {},
username: '',
profpic: '',
errors: ''
};

export default function(state = initialState, action) {
switch (action.type) {
  case LOGIN:
    return {
      isAuthenticated: true,
      accessToken: action.accessToken
    }
  case RECEIVE_USER_DATA:
    return Object.assign({}, state, action.userData)
  
    case LOGOUT:
      initialState.errors = action.message;
      return initialState;

  default:
    return state;
}
}