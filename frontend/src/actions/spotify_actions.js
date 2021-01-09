
import SpotifyWebApi from 'spotify-web-api-js';
import spotifyApi from '../util/spotify_api_util'

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_FEATURES = "RECEIVE_FEATURES";
export const RECCEIVE_TRACKS = "RECCEIVE_TRACKS";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";


export const login = accessToken => {
    return ({
    type: LOGIN,
    accessToken
})};

export const receiveUserData = userData => {
    return ({
    type: RECEIVE_USER_DATA,
    userData
})};

export const logout = () => ({
  type: LOGOUT,
})

export const receiveFeatures = features => {
    return ({
    type: RECEIVE_FEATURES,
    features
})};

export const receivePlaylists = playlists => {
    return ({
    type: RECEIVE_PLAYLISTS,
    playlists
})};

export const receiveTracks = tracks => {
    return ({
    type: RECEIVE_TRACKS,
    tracks
})};

export const setAccessToken = accessToken => dispatch => {
    spotifyApi.setAccessToken(accessToken)
    dispatch(login(accessToken))
    spotifyApi.getMe()
     .then(res => {
       dispatch(receiveUserData({
         username: res.display_name,
         profpic: res.images[0].url
       }))
      })
}

export const requestPlaylists = () => dispatch => {
  spotifyApi.getUserPlaylists({limit: 50})
    .then(res => {
      let playlists = {}
      
      res.items.forEach(x => {
        playlists[x.name] = x.id
      })
      dispatch(receivePlaylists(playlists))
    })
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

export const requestPlaylistItems = playlistId => dispatch => {
  spotifyApi.getPlaylistTracks(playlistId)
    .then(res => {
      dispatch(receiveTracks(res.items));
      let trackIds = [];
      res.items.forEach(item => {
          trackIds.push(item.track.id)
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