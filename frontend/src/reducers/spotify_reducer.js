import {RECEIVE_FEATURES, RECEIVE_PLAYLISTS, RECEIVE_TRACKS} from '../actions/spotify_actions'

const initialState = {
    features: [],
    tracks: [],
    playlists: {}
    };

export default (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_FEATURES:
            newState.features = action.features
            return newState;
        case RECEIVE_TRACKS:
            newState.tracks = action.tracks
            return newState;
        case RECEIVE_PLAYLISTS:
        newState.playlists = action.playlists
        return newState;
        default:
            return state;
    }
}