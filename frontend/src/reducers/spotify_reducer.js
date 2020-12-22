import {RECEIVE_FEATURES} from '../actions/spotify_actions'

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_FEATURES:
            return action.features;
        default:
            return state;
    }
}