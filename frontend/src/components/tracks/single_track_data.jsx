import { Radar } from 'react-chartjs-2'


export default ({track, trackFeatures}) => {
    if(track.type === 'track'){
        if(trackFeatures === undefined){
        return null
        }
    }
    const keyArr = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',];
    const modes = ['Maj', 'Min']
    const albumArtUrl = track.album.images[0].url
    
    const trackData = [track.popularity / 10, 
        trackFeatures.liveness * 10, 
        trackFeatures.energy * 10, 
        trackFeatures.valence * 10, 
        trackFeatures.danceability * 10, 
        trackFeatures.instrumentalness * 10]
        
    const data = {
        labels: ['Popularity', 'Liveness', 'Energy', 'Valence', 'Danceability', 'Instrumentalness'],
        datasets: [
            {
                label: '1 to 10',
                data: trackData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                
             
            },
        ],
    }

    const options = {
        scale: {
            ticks: { beginAtZero: true, stepSize: 1},
            labels: {fontSize: 20},
            gridLines: { color: 'rgba(250, 250, 250, .6)', lineWidth:2, drawBorder: true, drawOnChartArea: true, drawTicks: true},
            pointLabels: { fontSize: 20, fontColor: 'white'},
            angleLines: { color: 'rgba(250, 250, 250, .6)', }
        },
        
        
    }
    
    return (
        <div className="dynoTrack-container">
            <div className="album-info">
                <div>
                    <img src={albumArtUrl} alt="album" className="dyno-albumart"/>
                    <p className="album-name-sm">{track.album.name}</p>
                    <p className="album-name-sm">by {track.artists[0].name}</p>
                </div>
                <div className="album-data-div">
                    <h2>"{track.name}"</h2>
                    <p>
                        Tempo: {Math.floor(trackFeatures.tempo)} BPM
                        <br/>
                        Key: {keyArr[trackFeatures.key]} {modes[trackFeatures.mode]} 
                        <br/>
                        Beats Per Bar: {trackFeatures.time_signature}
                    </p>
                    
                    
                </div>

            </div>
            <div >
                <div className="radar">

                <Radar data={data} options={options} />
                </div>

            </div>
        </div>
    )

}