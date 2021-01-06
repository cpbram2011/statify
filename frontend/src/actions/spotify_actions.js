
import spotifyApi from '../util/spotify_api_util'

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_FEATURES = "RECEIVE_FEATURES";
export const RECCEIVE_TRACKS = "RECCEIVE_TRACKS";


export const login = accessToken => {
    return ({
    type: LOGIN,
    accessToken
})};

export const logout = () => ({
  type: LOGOUT,
})

export const receiveFeatures = features => {
    return ({
    type: RECEIVE_FEATURES,
    features
})};

export const receiveTracks = tracks => {
    return ({
    type: RECEIVE_TRACKS,
    tracks
})};

export const setAccessToken = accessToken => dispatch => {
    spotifyApi.setAccessToken(accessToken)
    dispatch(login(accessToken))
}

export const requestTopTracks = timeRange => dispatch => {
    spotifyApi.getMyTopTracks({limit: 50, time_range: timeRange})
      .then(res => {
        dispatch(receiveTracks(res.items));
        let trackIds = [];
        res.items.forEach(item => {
            trackIds.push(item.id)
        });
        dispatch(requestFeatures(trackIds))



      });
}

export const requestMostRecent = () => dispatch => {
    spotifyApi.getMyRecentlyPlayedTracks({limit: 50})
      .then(res => {
        dispatch(receiveTracks(res.items));
        let trackIds = [];
        res.items.forEach(item => {
            trackIds.push(item.track.id)
        });
        dispatch(requestFeatures(trackIds))
      })
};

export const requestMySaved = () => dispatch => {
    spotifyApi.getMySavedTracks({limit: 50})
      .then(res => {
        dispatch(receiveTracks(res.items));
        let trackIds = [];
        res.items.forEach(item => {
            trackIds.push(item.track.id)
        });
        dispatch(requestFeatures(trackIds))
      })
};



const requestFeatures = trackIds => dispatch => {
    spotifyApi.getAudioFeaturesForTracks(trackIds)
      .then(res => {
        dispatch(receiveFeatures(res.audio_features))})
}