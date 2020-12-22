
import spotifyApi from '../util/spotify_api_util'

export const LOGIN = "LOGIN";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";


export const login = accessToken => ({
    type: LOGIN,
    accessToken
});

export const setAccessToken = accessToken => dispatch => {
    console.log(accessToken)
    return (
    spotifyApi.setAccessToken(accessToken).then(res => dispatch(login(accessToken)))
)}

