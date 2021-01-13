import React from 'react';


export default class Tracks extends React.Component{

    render(){
        
        if(this.props.tracks.length < 1 || this.props.features.length < 1 || this.props.features.length !== this.props.tracks.length){
            return null
        }
        let features = this.props.features
        let tracks = this.props.tracks.map((ele, i)=> {

            return (
            <li>
                <div className="track-div" key={i} >
                   
                    <div className="album-div">
                    <img className="album-art" src={ele.album.images[0].url} alt="album art"></img>
                    <div className="song-info">
                    <p>"{ele.name}"</p>

                    <p className="artist-name">{ele.artists[0].name}</p>
                    </div>
                    </div>
                    
                    <div className="song-data">
                        Popularity: {ele.popularity}
                        Tempo: {features[i].tempo}
                    </div>
                    
                </div>
            </li>)
        })
        return(
            <div className="tracks-container">
                <ul className="track-ul">
                {tracks}
                </ul>
            </div>
        )
    }

    
}