import React from 'react';
import logo from './soundeq.png'


export default ({message}) => {
    const curly = "{}";
    return (
    <div className='splash'>
        <h1>Statify {curly}</h1>
        <h2>View and compare stats about your musical taste</h2>

        { process.env.NODE_ENV === 'production' ? 
        (
            <a href='https://statifymusic.herokuapp.com/login' > Login to Spotify </a>
            ):(
                <a href='http://localhost:8000/login' > Login to Spotify </a>
                )
            }
            <img src={logo} className='splashimg'/>
    <p>
        {message}
        </p>
    
    
    </div>
)}