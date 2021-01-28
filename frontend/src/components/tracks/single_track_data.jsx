
export default ({track, trackFeatures}) => {
    if(track === undefined || trackFeatures == undefined){
        return null
    }
    debugger
    const albumArtUrl = track.album.images[0].url
    const danceability = trackFeatures.danceability
    
    return (
        <div>
            <img src={albumArtUrl} alt="album"/>
            {danceability}


        </div>
    )

}