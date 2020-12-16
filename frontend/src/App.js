import React from 'react';
import * as spotifyApi from 'spotify-web-api-js'
export default class App extends React.Component {

  constructor(){
    super();
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token
    // if(token){
    //   spotifyApi.setAccessToken(token)
    // }
    // this.state = {
    //   loggedIn: token ? true : false,
    //   nowPlaying: { name: 'Not Checked', albumArt: '' }
    // }

  }
  getHashParams() { // <--
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
  
  render() {

    return (
      <div className="App">
        <a href='http://localhost:8000/login' > Login to Spotify </a>
      </div>
    );
  }
}
