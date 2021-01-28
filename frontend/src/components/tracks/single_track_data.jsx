
export default ({track, trackFeatures}) => {
    
    
    const albumArtUrl = track.album.images[0].url
    // const danceability = trackFeatures.danceability
    debugger
    return (
        <div>
            <img src={albumArtUrl} alt="album"/>
        </div>
    )

}