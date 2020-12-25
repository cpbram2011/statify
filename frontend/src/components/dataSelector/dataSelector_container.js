import {requestTopTracks, requestMostRecent, requestMySaved} from '../../actions/spotify_actions'
import {connect} from 'react-redux';
import DataSelector from './dataSelector';

const mDTP = dispatch => ({
    requestTopTracks: data => dispatch(requestTopTracks(data)),
    requestMostRecent: data => dispatch(requestMostRecent(data)),
    requestMySaved: data => dispatch(requestMySaved(data)),

});


export default connect(null, mDTP)(DataSelector)