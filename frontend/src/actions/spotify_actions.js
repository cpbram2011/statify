
import spotifyApi from '../util/spotify_api_util'

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_FEATURES = "RECEIVE_FEATURES";
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

export const logout = (message) => ({
  type: LOGOUT,
  message
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
    .catch(err => {
      if (err.status === 401) {
        dispatch(logout('Your session has timed out. Please sign in again.'))

      } else if (err.status === 503){
        //TODO: better error handling -_-
      } else {
        console.log(err)
      }
    })
}

//here
export const requestTopTracks = timeRange => dispatch => {
  let trackIds = [];
  let tracks = [];
    spotifyApi.getMyTopTracks({limit: 50, time_range: timeRange})
      .then(res => {
        tracks = tracks.concat(res.items)
        res.items.forEach(item => {
            trackIds.push(item.id)
        });
    
      spotifyApi.getMyTopTracks({limit: 50, offset: 49, time_range: timeRange})
        .then(res => {
          res.items.shift();
          res.items.forEach(item => {
            trackIds.push(item.id)
          });
          dispatch(receiveTracks(tracks.concat(res.items)));
          dispatch(requestFeatures(trackIds))
        })
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
  let trackIds = [];
    spotifyApi.getMyRecentlyPlayedTracks({limit: 50})
      .then(res => {
        res.items.forEach(item => {
          trackIds.push(item.track.id)
        });

        dispatch(receiveTracks(res.items));
        dispatch(requestFeatures(trackIds))
      })
};

export const requestMySaved = () => dispatch => {
    // spotifyApi.getMySavedTracks({limit: 50})
    //   .then(res => {
    //     dispatch(receiveTracks(res.items));
    //     let trackIds = [];
    //     res.items.forEach(item => {
    //         trackIds.push(item.track.id)
    //     });
    //     dispatch(requestFeatures(trackIds))
    //   })

      let trackIds = [];
      let tracks = [];
        spotifyApi.getMySavedTracks({limit: 50})
          .then(res => {
            tracks = tracks.concat(res.items)
            res.items.forEach(item => {
                trackIds.push(item.track.id)
            });
        
          spotifyApi.getMySavedTracks({limit: 50, offset: 49})
            .then(res => {
              res.items.shift();
              res.items.forEach(item => {
                trackIds.push(item.track.id)
              });
              dispatch(receiveTracks(tracks.concat(res.items)));
              dispatch(requestFeatures(trackIds))
            })
        });
};

const requestFeatures = trackIds => dispatch => {
    spotifyApi.getAudioFeaturesForTracks(trackIds)
      .then(res => {
        dispatch(receiveFeatures(res.audio_features))})
}