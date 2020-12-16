import React from 'react';

export default class App extends React.Component {

  constructor(){
    super();
    const params = this.getHashParams();
    console.log(params);
  }
  getHashParams() { // <--
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    debugger
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
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
