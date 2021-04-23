import { connect } from 'react-redux';
import Tracks from './tracks';

const mSTP = state => ({
    tracks: state.entities.tracks,
    features: state.entities.features
})



export default connect(mSTP, null)(Tracks)