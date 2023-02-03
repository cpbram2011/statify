import React from 'react'
import spotifyApi from '../../util/spotify_api_util'
import SingleTrackData from '../tracks/single_track_data'
export default class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search: '',
            tracks: [],
            features: [],
            artists: [],
            selectedTrack: undefined,
            selectedFeatures: undefined
        }
        this.updateForm = this.updateForm.bind(this)
        this.submitSearch = this.submitSearch.bind(this)

    }
    componentDidUpdate(prevState, snapshot) {
        
        if (snapshot.tracks[0] != this.state.tracks[0] || snapshot.selectedTrack != this.state.selectedTrack ) {
            window.scroll({ top: 2800, behavior: 'smooth' })
        }
    }

    updateForm(){
        
        return e => this.setState({search: e.target.value})
        // this.setState({search: str, type: type})
    }

    submitSearch(e){
        
        e.preventDefault()
        
        if(this.state.search != ''){
            spotifyApi.searchTracks(this.state.search).then(obj => {
                const trackIds = obj.tracks.items.map(ele => ele.id)
                const tracks = obj.tracks.items
                
                spotifyApi.getAudioFeaturesForTracks(trackIds)
                    .then(res => {
                        
                        this.setState({ features: res.audio_features, tracks, selectedTrack : undefined, selectedFeatures: undefined })
                        window.scroll({ top: 2200, behavior: 'smooth' })
                    })
                
                
            })
        }
    }

    propagateTrackData(track, features, id) {
        
        if(this.state.selectedTrack === undefined){
            const addClassEle = document.getElementById(id)
            addClassEle.classList.add('selected-track')
          
        }else{
            const lastEle = this.state.selectedTrack.id
            debugger
            const removeClassEle = document.getElementById(lastEle)
            const addClassEle = document.getElementById(id)

            removeClassEle.classList.remove('selected-track')
            addClassEle.classList.add('selected-track')
            
        }
       
        this.setState({ selectedTrack: track, trackFeatures: features })
        
    }


    render(){
        let tracks
        let features = this.state.features
         
        if(this.state.tracks.length != 0){

            
            tracks = this.state.tracks.map((ele, i) => {
                let minutes = Math.floor((ele.duration_ms / 1000) / 60).toString()
                let seconds = Math.floor((ele.duration_ms / 1000) % 60)
                seconds = (seconds < 10) ? `0${seconds.toString()}` : seconds.toString()
                const style = ""
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
            document.getElementById('search-result').classList.remove('hidden')
           
        }
        
        return(
            <div>
                <div className="search-bar">
                    <h1>Search Tracks:</h1>
                    <form action="search" onSubmit={(e) => this.submitSearch(e)}>
                        <input type="text" name="search" id="search" onChange={this.updateForm()} />
                    </form>
                </div>
                <div className="search-tracklist-section hidden" id="search-result">
                
                
            
                    
                        <div className="search-tracks-container">
                            <h1>Search Results:</h1>
                            <ul className="search-track-ul">
                                {tracks}
                            </ul>
                        </div>
             

                    
                    <div className="search-track-show-container">

                        <SingleTrackData track={this.state.selectedTrack} trackFeatures={this.state.trackFeatures} />
                    </div>
                
            </div>
            </div>
        )
    }
}
