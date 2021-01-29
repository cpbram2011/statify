import React from 'react';
import spotifyApi from '../src/util/spotify_api_util';
import {setAccessToken, logout} from '../src/actions/spotify_actions'
import {connect} from 'react-redux';
import DataSelector from '../src/components/dataSelector/dataSelector_container'
import Graph from '../src/components/graph/graph_container';
import Axios from 'axios';
import Splash from './components/splash/splash';
import Tracks from './components/tracks/track_component'



// import './assets/css/fonts.css';
const mSTP = state => {
  return ({
    loggedIn: state.session.isAuthenticated,
    username: state.session.username,
    profpic: state.session.profpic,
    errors: state.session.errors
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
    
    if (!this.props.loggedIn) return <Splash message={this.props.errors}/>

    

    return (
      <div className="App">
       
        <div className='navbar'>
          <div className='left'>
            <h1>Statify</h1>
          </div>
          <div className='right' onClick={() => this.toggleDropdown()}> 
            <img src={this.props.profpic} ></img>
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
            <form action="https://www.spotify.com/us/account/apps/">
            <button type='submit'>
            <a>Remove Statify account</a>
              </button>    
            </form>
          </div>
        )}
        
        {!this.state.modal ? null : (
          <div className='modal-background' onClick={() => this.closeModal()}>
            <div className='modal-wrapper'>
            <div className='modal' onClick={e => e.stopPropagation()}>
              <c onClick={() => this.closeModal()}>close (x)</c>
              <li>
              <h1>About Statify</h1>
                <h3>Overview</h3>
                <p>Statify is a web app that uses Spotify API to connect to your Spotify account and display graphs with data pulled from your listening history, saved tracks, and playlists.</p>
              </li>
              <li>
                <h3>Developers</h3>
                <li className='dev'><b>Chris Bram</b> <br></br>
                <a target='_blank' href='https://www.linkedin.com/in/chris-bram-522a661b9/'>LinkedIn</a>
                <a target='_blank' href='https://github.com/cpbram2011'>Github</a>
                <a target='_blank' href='https://cpbram2011.github.io/'>Portfolio Site</a>
                </li>
                <br></br>
                <li className='dev'><b>Michael Wideburg</b> <br></br>
                  <a target='_blank' href='https://www.linkedin.com/in/michael-wideburg-01331b34/'>LinkedIn</a>
                  <a target='_blank' href='https://github.com/mwideburg'>Github</a>
                  <a target='_blank' href='https://mwideburg.github.io/'>Portfolio Site</a>


                </li>
              </li>
              <br></br>
              <li>
              
              <h1>F.A.Q.</h1> 
                <h3>Is it secure?</h3>
                <p>Statify adheres to all the latest standards in web security. And as logging in to Statify is handled by Spotify, it's as secure as logging in to Spotify itself.</p>
              </li>
              <li>
                <h3>How is my data used?</h3>
                <p>To use Statify, you'll need to allow the app to have access to some of your account information. Your data is only used to calculate an average with which users can compare their own scores.</p>        
              </li>
              <li>
                <h3>I have some other issue (or concern, compliment, maybe a suggestion)</h3>
                <a href='mailto:cpbram2011@gmail.com'>Feel free to reach out via email!</a>
              
              </li>
              <br></br>
            </div>
            </div>
          </div>
        )}
        <DataSelector />
        <Graph/>

        <Tracks/>
        
      </div>
    );
  }
}


export default connect(mSTP, mDTP)(App)

