import React from 'react';
import spotifyApi from '../src/util/spotify_api_util';
import {setAccessToken, logout} from '../src/actions/spotify_actions'
import {connect} from 'react-redux';
import DataSelector from '../src/components/dataSelector/dataSelector_container'
import Graph from '../src/components/graph/graph_container';
import Axios from 'axios';
import Splash from './components/splash/splash';

const mSTP = state => {
  return ({
    loggedIn: state.session.isAuthenticated
  })
}

const mDTP = dispatch => {

  return ({
  setAccessToken: accessToken => dispatch(setAccessToken(accessToken)),
  logout: () => dispatch(logout())
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
    
    if (!this.props.loggedIn) return <Splash/>



    return (
      <div className="App">

        <button onClick={() => this.props.logout()}> Logout</button>      
        <button onClick={() => this.startCycle()}> Start Refresh Cycle</button>      
        <DataSelector />
        <Graph/>
      </div>
    );
  }
}


export default connect(mSTP, mDTP)(App)

