import React from 'react';


class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();
    console.log(params);
  }
  getHashParams() {
    var hashParams = {};
    debugger
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  render() {
    debugger
    return (
      <div className="App">
        <a href='http://localhost:8000/login' > Login to Spotify </a>
      </div>
    );
  }
}

export default App;