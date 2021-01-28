import React from 'react';
import SingleTrackData from './single_track_data.jsx'

export default class Tracks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTrack: this.props.tracks[0],
            trackFeatures: this.props.features[0],
            
        }
        this.propagateTrackData = this.propagateTrackData.bind(this)
    }
    propagateTrackData(track, features){
        debugger
        this.setState({selectedTrack: track, trackFeatures: features})
    }
    
    render(){
        
        if(this.props.tracks.length < 1 || this.props.features.length < 1 || this.props.features.length !== this.props.tracks.length){
        
            return null;
        }
        const keyArr = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',];
        const modes = ['Maj', 'Min']
        
        let features = this.props.features
        let tracks = this.props.tracks.map((ele, i)=> {
            let minutes = Math.floor((ele.duration_ms / 1000) / 60).toString()
            let seconds = Math.floor((ele.duration_ms / 1000) % 60)
            seconds = (seconds < 10) ? `0${seconds.toString()}` : seconds.toString()
            
            return (
                <li key={ele.id} onClick={() => this.propagateTrackData(ele, features[i])}>
                <div className="track-div">
                    <div className="album-div">
                        <img className="album-art" src={ele.album.images[0].url} alt="album art"></img>
                        <div className="song-info">
                            <p className='song-title'>"{ele.name}"</p>
                            <p className="artist-name">{ele.artists[0].name}</p>
                        </div>
                    </div>
                    <div className="song-data">
                            <p className="song-title"> {minutes}:{seconds}</p>
                    </div>
                    
                </div>
            </li>)
        })
        return(
            <div className="tracklist-section">
                <div className="tracks-container">
                    <h1>Track List:</h1>
                    <ul className="track-ul">
                    {tracks}
                    </ul>
                </div>
                <div className="track-show-container">
                        <h1>THIS IS FOR THE TRACK DATA</h1>
                    <SingleTrackData track={this.state.selectedTrack} trackFeatures={this.state.trackFeatures}/>
                </div>
            </div>
        )
    }

    
}