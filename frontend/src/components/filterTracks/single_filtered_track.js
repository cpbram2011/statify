export default  function SingleFilteredTrack({track, features, index}){
    if(track === undefined) return null
    let title = track.name
    let popularity = track.popularity
    let valence = features.valence
    let danceability = features.danceability
    let energy = features.energy
    let liveness = features.liveness
    let instrumentalness = features.instrumentalness
    let image = track.album.images[0].url
    let album_name = track.album.name
    let artist = track.artists[0].name
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    return (
        <div className="album-info">
            <h1> {index + 1}.</h1>
            <div className="album-art-div" onClick={() => openInNewTab(track.external_urls.spotify)}>
                <img src={image} alt="album" className="dyno-albumart" />
                <p className="album-name-sm"><b>{album_name}</b>
                    <br />
                    by {artist}
                </p>
            </div>
            <div className="album-data-div">
                <ul>
                <li>
                    <h2>"{title}"</h2>
                        Popularity: {popularity}
                    <p>
                        Valence: {valence}
                    </p>
                    <p>
                        Dance: {danceability}
                    </p>
                </li>
                </ul>
            </div>
        </div>
    )
}