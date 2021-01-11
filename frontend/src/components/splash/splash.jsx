import React from 'react';


export default ({message}) => {
    return (
    <>
        <h1>Statify</h1>
        <h2>View and compare stats about your musical taste</h2>

        { process.env.NODE_ENV === 'production' ? 
        (
        <a href='https://statifymusic.herokuapp.com/login' > Login to Spotify </a>
        ):(
        <a href='http://localhost:8000/login' > Login to Spotify </a>
        )
    }
    <p>
        {message}
        </p>
    
    
    </>
)}