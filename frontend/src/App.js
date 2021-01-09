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
    loggedIn: state.session.isAuthenticated,
    username: state.session.username,
    profpic: state.session.profpic
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
      dropdown: false,
      modal: false
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
  toggleDropdown () {
    this.setState({dropdown: !this.state.dropdown})
  }
  
  openModal () {
    this.setState({modal: true, dropdown: false})
  }
  closeModal () {
    this.setState({modal: false})
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
        
        setAuthToken(data.access_token)
      }).catch(err => console.log(err));
      
    }, 1000)
      
  }
    

  

  
  render() {
    
    if (!this.props.loggedIn) return <Splash/>

    

    return (
      <div className="App">

        <div className='navbar'>
          <div className='left'>
            <h1>Statify</h1>
          </div>
          <div className='right'> 
            <img src={this.props.profpic} onClick={() => this.toggleDropdown()}></img>
            <p onClick={() => this.toggleDropdown()}>
            {this.props.username}
            </p>
          </div>

        </div>

        {!this.state.dropdown ? null : (
          <div className='dropdown-content'>

            <button onClick={() => this.openModal()}> About</button>      
            <button onClick={() => this.props.logout()}> Logout</button>      
            {/* <button onClick={() => this.startCycle()}> Start Refresh Cycle</button>   */}
            <button>
            <a href="https://www.spotify.com/us/account/apps/">Remove Statify account</a>
              
              </button>    
          </div>
        )}

        {!this.state.modal ? null : (
          <div className='modal-background' onClick={() => this.closeModal()}>
            <div className='modal'>
              <button onClick={() => this.closeModal()}>X</button>
              <p>lorem ipsum dolaris enfkasdfioasef;asdjfnaslkdgjasdhlfgjkasnefljkasdvoliasdnrugasdkjrfselakjrfhselaifuasdnflasjkdfnasdljkfsadnflkasjdnfl</p>
            </div>
          </div>
        )}
        <DataSelector />
        <Graph/>

        <h1>NEXTCOMPONENT</h1>
      </div>
    );
  }
}


export default connect(mSTP, mDTP)(App)

