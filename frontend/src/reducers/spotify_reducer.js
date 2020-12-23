import {RECEIVE_FEATURES, RECEIVE_TRACKS} from '../actions/spotify_actions'

const initialState = {
    features: [],
    tracks: {}
    };

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_FEATURES:
            state.features = action.features
            return state;
        case RECEIVE_TRACKS:
            state.tracks = action.tracks
            return state;
        default:
            return state;
    }
}