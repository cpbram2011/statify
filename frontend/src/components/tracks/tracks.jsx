import React from 'react';
import SingleTrackData from './single_track_data.jsx'
import { useEffect } from 'react';

export default class Tracks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTrack: this.props.tracks[0],
            trackFeatures: this.props.features[0],
        }
        this.propagateTrackData = this.propagateTrackData.bind(this)
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props){
            this.setState({ selectedTrack: this.props.tracks[0], trackFeatures: this.props.features[0]})
        }
    }

    propagateTrackData(track, features, id){
        const lastEle = (this.state.selectedTrack === undefined) ? this.props.tracks[0].id : this.state.selectedTrack.id
        const removeClassEle = document.getElementById(lastEle)
        const addClassEle = document.getElementById(id)
        
        removeClassEle.classList.remove('selected-track')
        addClassEle.classList.add('selected-track')

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
            const style = i === 0 ? "selected-track" : ""
            return (
                <li id={ele.id} key={ele.id} onClick={() => this.propagateTrackData(ele, features[i], ele.id)} className={style}>
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

        const selectedTrack = (this.state.selectedTrack === undefined) ? this.props.tracks[0] : this.state.selectedTrack
        const trackFeatures = (this.state.trackFeatures === undefined) ? this.props.features[0] : this.state.trackFeatures

        
        return(
            <div className="tracklist-section">
                <div className="tracks-container">
                    <h1>Track List:</h1>
                    <ul className="track-ul">
                    {tracks}
                    </ul>
                </div>
                <div className="track-show-container">
                        
                    <SingleTrackData track={this.state.selectedTrack} trackFeatures={this.state.trackFeatures}/>
                </div>
            </div>
        )
    }

    
}