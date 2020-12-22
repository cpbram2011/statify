
import spotifyApi from '../util/spotify_api_util'

export const LOGIN = "LOGIN";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";


export const login = accessToken => {
    return ({
    type: LOGIN,
    accessToken
})};

export const setAccessToken = accessToken => dispatch => {
    spotifyApi.setAccessToken(accessToken)
    dispatch(login(accessToken))
}

