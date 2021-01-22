import React from 'react';


export default class Tracks extends React.Component{
    
    render(){
        
        if(this.props.tracks.length < 1 || this.props.features.length < 1 || this.props.features.length !== this.props.tracks.length){
        
            return null;
        }
        const keyArr = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',];
        const modes = ['Maj', 'Min']
        
        let features = this.props.features
        let tracks = this.props.tracks.map((ele, i)=> {
            debugger
            // popularity in tracks
            // key and mode
            // dance
            // tempo
            // 
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
                        <section>
                        {/* Popularity:  */}
                        {ele.popularity}
                        </section>
                        <section>
                        {/* TEMPO */}
                        {features[i].tempo}
                        </section>
                        <section>
                        {/* DANCEABILITY */}
                        {features[i].danceability}
                        </section>
                        <section className="song-key">
                        {/* KEY */}
                        {keyArr[features[i].key]} {modes[features[i].mode]}
                        </section>
                    </div>
                    
                </div>
            </li>)
        })
        return(
            <div>
                <div className="slant-container">
                    {/* <div className="top-border">

                    </div> */}
                    <div className="slant-grid1">
                        Popularity
                    </div>
                    <div className="slant-grid2">
                        Tempo
                    </div>
                    <div className="slant-grid3">
                        Danceability
                    </div>
                    <div className="slant-grid4">
                        Key and Mode
                    </div>
                    
                </div>
                <div className="tracks-container">
                    <ul className="track-ul">
                    {tracks}
                    </ul>
                </div>
            </div>
        )
    }

    
}