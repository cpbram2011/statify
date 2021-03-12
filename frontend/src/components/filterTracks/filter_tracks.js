import React from "react";
import SingleFilteredTrack from './single_filtered_track'

export default class FilterTracks extends React.Component {
    constructor(){
        super()
        this.state = {
            filters: new Set(),
            thresholds: {}
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps != this.props) {
            
            this.setState({
                filters: new Set(),
                thresholds: {}
            })
          
        }
    }
    createThresholds(){
       
        const tracks = this.props.tracks
        const features = this.props.features
        const size = tracks.length
        
        let sums = [0, 0, 0, 0, 0, 0]
        Object.values(features).forEach((ele, idx) => {
            sums[0] += tracks[idx].popularity / 10
            sums[1] += (ele.danceability * 10)
            sums[2] += (ele.energy * 10)
            sums[3] += (ele.valence * 10)
            sums[4] += (ele.liveness * 10)
            sums[5] += (ele.instrumentalness * 10)
        })
        let thresholds = {
            popularity: sums[0] / size,
            danceability: sums[1] / size,
            energy: sums[2] / size,
            valence: sums[3] / size,
            liveness: sums[4] / size,
            instrumentalness: sums[5] / size,
        }
        return thresholds
        
    }
    filterTopTracks(thresholds){
        if(thresholds === undefined) return null
        let threshold = 0
        
        this.state.filters.forEach(filter => {
            threshold += thresholds[filter]
        })
        
        const tracks = this.props.tracks
        const features = this.props.features
        const min = (tracks.length < 5) ? tracks.length : 5
        let tracks_weighted = []

        Object.values(features).forEach((ele, idx) => {
            let sum = 0
            this.state.filters.forEach(filter => {
                if(filter === 'popularity'){
                    sum += tracks[idx][filter] / 10
                }else{
                    sum += ele[filter] * 10
                }
                
            })
            
            
            tracks_weighted.push([sum - threshold, idx])
        })
        if (tracks_weighted.length === 0) return null
        function compare(a, b){
            let comparison = 0
            
            if(a[0] > b[0]){
                comparison = -1
            }else{
                comparison = 1
            }
            return comparison
        }
        let sorted = tracks_weighted.sort(compare)
        debugger
        let topTracks = []
        let topTracksFeatures = []
        for(let i = 0; i < min; i++){
            topTracks.push(tracks[sorted[i][1]])
            topTracksFeatures.push(features[sorted[i][1]])
        }
        return [topTracks, topTracksFeatures]
    }

    addFilter(filter){
        let bool = this.state.filters.has(filter)
        let current_filters = this.state.filters
        if(bool){
            current_filters.delete(filter)
            document.getElementById(filter).classList.remove('selected')
        }else{
            current_filters.add(filter)
            document.getElementById(filter).classList.add('selected')
        }
        
        this.setState({ filters: current_filters})
    }
    

    render() {
        if (!this.props.tracks || !this.props.features) return null;
        if (this.props.tracks.length < 1 || this.props.features.length < 1 || this.props.features.length !== this.props.tracks.length) {

            return null;
        }
        let thresholds = this.createThresholds()
        let top_track_features = this.filterTopTracks(thresholds)
        if(top_track_features === null) return null
        let top_tracks = top_track_features[0]
        let top_features = top_track_features[1]
        let topTrack = top_tracks.shift()
        let topFeature = top_features.shift()
        
        let result = top_tracks.map((track, i) => {

            return(
                <SingleFilteredTrack track={track} features={top_features[i]} index={i + 1}/>
            )
        })
        
        return(
            <div className="filter-container">
                <h1> Top Tracks Based On Attributes</h1>
                <div className="filter-selection">
                    <button className="filter" id="popularity" onClick={() => this.addFilter('popularity')}> Popularity</button>
                    <button className="filter" id="danceability" onClick={() => this.addFilter('danceability')}> Danceability</button>
                    <button className="filter" id="energy" onClick={() => this.addFilter('energy')}> Energy</button>
                    <button className="filter" id="valence" onClick={() => this.addFilter('valence')}> Valence</button>
                    <button className="filter" id="liveness" onClick={() => this.addFilter('liveness')}> Liveness</button>
                    <button className="filter" id="instrumentalness" onClick={() => this.addFilter('instrumentalness')}>Instrumentalness</button>
                </div>
                <div className="top-tracks-container">
                    <div className="top-track-show">
                        <SingleFilteredTrack track={topTrack} features={topFeature} index={0}/>
                    </div>
                    <div className="other-top-tracks">
                        {result}
                    </div>
                </div>
                
            </div>
        )


    }

}