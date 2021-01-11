import {RECEIVE_ERRORS} from '../actions/spotify_actions';


export default (state, action) =>{
    switch (action.type) {
        case RECEIVE_ERRORS:
            return action.error
            break;
    
        default:
            return null
            break;
    }
}