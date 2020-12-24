import {connect} from 'react-redux';
import Graph from './graph';



const mSTP = state => {
    return ({
    data: state.entities.features
})};


export default connect(mSTP, null)(Graph)