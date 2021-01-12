import React from 'react';
import spotifyApi from '../src/util/spotify_api_util';
import {setAccessToken} from '../src/actions/spotify_actions'
import {connect} from 'react-redux';
import DataSelector from '../src/components/dataSelector/dataSelector_container'
import Graph from '../src/components/graph/graph';
import Axios from 'axios';

const mSTP = state => {
  return ({
    state
  })
}

const mDTP = dispatch => {

  return ({
  setAccessToken: accessToken => dispatch(setAccessToken(accessToken))
})
}


class App extends React.Component {

  constructor(props){
    super(props);
    const params = this.getHashParams();
    const token = params.access_token
    console.log(params.refresh_token) // <-
    if(token){
      this.props.setAccessToken(token)
    }


    this.state = {
      params: params,
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      recentlyPlayed: [],
      topTracks: [],
      features: {}
    }
    this.startCycle = this.startCycle.bind(this)

    window.state = this.state;
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(2);
    
    e = r.exec(q)
    while ( e ) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    
    console.log(hashParams)
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlayingTrack()
      .then((response) => {
        
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
  }
  getRecentlyPlayed(){
    let unix_timestamp = 1484111023500
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    // Year
    var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear();

    // Month
    var month = months_arr[date.getMonth()];

    // Day
    var day = date.getDate();

    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = year + "," + month + " " + day + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    // console.log(formattedTime);
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 })
      .then((response) => {
        let recent = []
        
        for(let i = 0; i < response.items.length; i ++){
          let play = {}
          play.albumArt = response.items[i].track.album.images[0].url
          play.title = response.items[i].track.name
          play.album = response.items[i].track.album.name
          play.artist = response.items[i].track.artists[0].name
          recent.push(play)
        }
        this.setState({
          recentlyPlayed: recent
        })
      })
  }
  

  startCycle () {
    const refresh = this.state.params.refresh_token;
    const setAuthToken = this.props.setAccessToken;
    setTimeout(() => {
      Axios.get('http://localhost:8000/refresh_token', {
        params: {
          refresh_token: refresh
        }
      }).then(function ({data}) {
        debugger
        setAuthToken(data.access_token)
      }).catch(err => console.log(err));
      
    }, 1000)
      
  }
    

  

  
  render() {
    let recent
    if(this.state.recentlyPlayed.length > 0){
        let i = 0
        recent = this.state.recentlyPlayed.map(ele => {
          return (
            <div key={i++} className=" cf">
              <h3>{ele.album}</h3>
              <img src={ele.albumArt} style={{ height: 150 }} />
              <br/>
              "{ele.title}"
              <br/>
              {ele.artist}
            </div>
          )
        })
    }




    return (
      <div className="App">
        <a href='http://localhost:8000/login' > Login to Spotify </a>
        <button onClick={() => this.startCycle()}> Start Refresh Cycle</button>
        <DataSelector />
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        <div>
          {/* vvv ? */}
            {this.state.loggedIn &&
            <>
              <button onClick={() => this.getRecentlyPlayed()}>
                Check Recent Plays
          </button>
              <button onClick={() => this.getMyTopTracks()}>
                Check Top Tracks
          </button>
          </>
            }
          <div className="center cf">
            <h2> Recently Played </h2>
            
          {recent}
          </div>
        </div>
        
        
      </div>
    );
  }
}


export default connect(mSTP, mDTP)(App)

