import { connect } from 'react-redux';
import FilterTracks from './filter_tracks';

const mSTP = state => {
    
    return {
    tracks: state.entities.tracks,
    features: state.entities.features
    }
}



export default connect(mSTP, null)(FilterTracks)
