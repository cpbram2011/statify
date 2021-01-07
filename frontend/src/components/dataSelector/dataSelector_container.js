import {requestTopTracks, requestMostRecent, requestMySaved, requestPlaylists, requestPlaylistItems} from '../../actions/spotify_actions'
import {connect} from 'react-redux';
import DataSelector from './dataSelector';

const mSTP = state => ({
    playlists: state.entities.playlists
})

const mDTP = dispatch => ({
    requestTopTracks: data => dispatch(requestTopTracks(data)),
    requestMostRecent: data => dispatch(requestMostRecent(data)),
    requestMySaved: data => dispatch(requestMySaved(data)),
    requestPlaylists: () => dispatch(requestPlaylists()),
    requestPlaylistItems: (playlistId) => dispatch(requestPlaylistItems(playlistId)),
});


export default connect(mSTP, mDTP)(DataSelector)