import {RECEIVE_FEATURES, RECEIVE_TRACKS} from '../actions/spotify_actions'

const initialState = {
    features: [],
    tracks: {}
    };

export default (state = {}, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_FEATURES:
            newState.features = action.features
            return newState;
        case RECEIVE_TRACKS:
            newState.tracks = action.tracks
            return newState;
        default:
            return state;
    }
}