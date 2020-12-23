import React from 'react';
import spotifyApi from '../../util/spotify_api_util'
import {requestTopTracks, requestMostRecent, requestMySaved} from '../../actions/spotify_actions'
import {connect} from 'react-redux';

const mDTP = dispatch => ({
    requestTopTracks: data => dispatch(requestTopTracks(data)),
    requestMostRecent: data => dispatch(requestMostRecent(data)),
    requestMySaved: data => dispatch(requestMySaved(data)),

});


class DataSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: 'recent',
            time: 'medium_term'
        };
        this.getData = this.getData.bind(this);
    }

    dataChange (e) {
        this.setState({data: e.target.value})
    }
    timeChange (e) {
        this.setState({time: e.target.value})
    }

    getData () {
        switch (this.state.data) {
            case 'recent':
                console.log('looking for recent data')
                this.props.requestMostRecent(this.state.time)
                
                break;
            case 'top':
                console.log('looking for top data')
                this.props.requestTopTracks(this.state.time)
                break;
                case 'liked':
                    console.log('looking for liked data')
                    this.props.requestMySaved(this.state.time)
                break;
        
            default:
                break;
        }
    }

    render () {
        this.getData()
        return (
            <div className='data-selector'> 
                <p>Based on your</p>
                <select onChange={this.dataChange.bind(this)} value={this.state.data}>
                    <option value="top">Top Tracks</option>
                    <option value="recent">Most Recent Tracks</option>
                    <option value="liked">Liked Tracks</option>
                </select>

                {this.state.data === 'top' ? (
                    <>
                    <p>based on the past </p>
                    <select onChange={this.timeChange.bind(this)} value={this.state.time}>
                    <option value="short_term">4 weeks</option>
                    <option value="medium_term">6 months</option>
                    <option value="long_term">All time</option>
                    </select>
                    </>
                ) : null}

                <button onClick={this.getData.bind(this)}>Get Data</button>
            </div>
        )
    }
}

export default connect(null, mDTP)(DataSelector)