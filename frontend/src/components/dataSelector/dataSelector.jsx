import React from 'react';

export default class DataSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: 'liked',
            time: 'medium_term'
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount () {
        this.props.requestPlaylists()
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
                this.props.requestMostRecent(this.state.time)
                break;
            case 'top':
                this.props.requestTopTracks(this.state.time)
                break;
            case 'liked':
                this.props.requestMySaved(this.state.time)
                break;
        
            default:
                this.props.requestPlaylistItems(this.state.data)
                break;
        }
    }

    render () {
        this.getData()

        const playlistOptions = Object.keys(this.props.playlists).map((k) => (
            <option value={this.props.playlists[k]} key={this.props.playlists[k]}>{k}</option>
        ))
        return (
            <>
            <div className='dataSelector'> 
                <p>Based on your</p>
               
                <select onChange={this.dataChange.bind(this)} value={this.state.data}>
                    <option value="top">Top Tracks</option>
                    <option value="recent">Most Recent Tracks</option>
                    <option value="liked">Liked Tracks</option>
                    <option value="playlist" disabled>— Playlists —</option>
                    {playlistOptions}
                </select>
                {this.state.data.length > 9 ? (
                    <p>playlist</p>
                ) : null }
                
                {this.state.data === 'top' ? (
                    <>
                    <p>from the past </p>
                    <select onChange={this.timeChange.bind(this)} value={this.state.time}>
                    <option value="short_term">4 weeks</option>
                    <option value="medium_term">6 months</option>
                    <option value="long_term">All time</option>
                    </select>
                    </>
                ) : null}

                </div>
            </>
        )
    }
}
