import React from 'react';
import spotifyApi from '../../util/spotify_api_util'
import {receiveFeatures} from '../../actions/spotify_actions'
import {connect} from 'react-redux';

const mDTP = dispatch => ({
    receiveFeatures: data => dispatch(receiveFeatures(data))
});

class DataSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: 'recent',
            time: 'medium_term'
        }
    }

    dataChange (e) {
        this.setState({data: e.target.value})
    }
    timeChange (e) {
        this.setState({time: e.target.value})
    }

    getData (e) {
        e.preventDefault()
        switch (this.state.data) {
            case 'recent':
                console.log('looking for recent data')
                spotifyApi.getMyRecentlyPlayedTracks({limit: 50})
                  .then(res => {
                      this.props.receiveFeatures(res.items)
                  })
                break;
            case 'top':
                console.log('looking for top data')
                break;
            case 'liked':
                console.log('looking for liked data')
                break;
        
            default:
                break;
        }
    }

    render () {
        return (
            <div className='data-selector'> 
                <p>Select Your Data</p>
                <select onChange={this.dataChange.bind(this)} value={this.state.data}>
                    <option value="top">Top Tracks</option>
                    <option value="recent">Most Recent Tracks</option>
                    <option value="liked">Liked Tracks</option>
                </select>

                {this.state.data === 'top' ? (
                    <select onChange={this.timeChange.bind(this)} value={this.state.time}>
                    <option value="short_term">Short Term</option>
                    <option value="medium_term">Medium Term</option>
                    <option value="long_term">Long Term</option>
                    </select>
                ) : null}

                <button onClick={this.getData.bind(this)}>Get Data</button>
            </div>
        )
    }
}

export default connect(null, mDTP)(DataSelector)