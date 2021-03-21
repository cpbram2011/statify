import React from 'react';
import SingleTrackData from './single_track_data.jsx'

export default class Tracks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTrack: this.props.tracks[0],
            selectedId: 0,
            trackFeatures: this.props.features[0],
            sortBy: "date added"
        }
        this.propagateTrackData = this.propagateTrackData.bind(this)
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props){
            this.setState({ selectedTrack: this.props.tracks[0], selectedId: 0, trackFeatures: this.props.features[0]})
        }
    }

    propagateTrackData(track, features, i){
        // const lastEle = (this.state.selectedTrack === undefined) ? 0 : this.state.selectedId
        const removeClassEle = document.getElementsByClassName('selected-track')[0];
        const addClassEle = document.getElementById(i)
        
        removeClassEle.classList.remove('selected-track')
        addClassEle.classList.add('selected-track')

        this.setState({selectedTrack: track, trackFeatures: features, selectedId: i})
    }
    
    render(){
        if(this.props.tracks.length < 1 || this.props.features.length < 1 || this.props.features.length !== this.props.tracks.length){
        
            return null;
        }
        
        const keyArr = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',];
        const modes = ['Maj', 'Min']
        
        const {features, tracks} = this.props;

        let order = [];

        if (this.state.sortBy !== 'date added'){
            if (this.state.sortBy === 'popularity'){
                tracks.forEach((x,i) => {
                    order.push([i, x.popularity])
                })
            } else {
                features.forEach((x,i) => {
                    order.push([i, x[this.state.sortBy]])
                })

            }
        } else {
            tracks.forEach((_,i) => order.push([i, tracks.length - i -1]))
        }
        order = order.sort((x,y) => y[1] - x[1]);
        let trackEles = [];

        order.forEach((x, i)=> {
            const ele = tracks[x[0]];
            let minutes = Math.floor((ele.duration_ms / 1000) / 60).toString()
            let seconds = Math.floor((ele.duration_ms / 1000) % 60)
            seconds = (seconds < 10) ? `0${seconds.toString()}` : seconds.toString()
            const style = x[0] === 0 ? "selected-track" : ""
            trackEles.push(
                <li id={i} key={i} onClick={() => this.propagateTrackData(ele, features[x[0]], x[0])} className={style}>
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
        window.order = this.state;
        
        return(
            <>
                
            <div className="tracklist-section">
                
                <div className="tracks-container">
                    <h1>Track List:</h1>
                    <h1>Sort By: </h1>
                    <select onChange={e => this.setState({sortBy: e.target.value})}>
                        <option value="date added">Date Added</option>
                        <option value="popularity">Popularity</option>
                        <option value="liveness">Liveness</option>
                        <option value="energy">Energy</option>
                        <option value="valence">Valence</option>
                        <option value="danceability">Danceability</option>
                    </select>
                    <ul className="track-ul">
                    {trackEles}
                    </ul>
                </div>
                <div className="track-show-container">
                        
                    <SingleTrackData track={this.state.selectedTrack} trackFeatures={this.state.trackFeatures}/>
                </div>
            </div>
            </>
        )
    }

    
}