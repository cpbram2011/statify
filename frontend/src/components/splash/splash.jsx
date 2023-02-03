import React from 'react';
import logo from './soundeq.png'
import {useState} from 'react';
import copy from './copy-solid.svg';

export default ({message}) => {
    const [modal, changeModal] = useState(false)
    const curly = "{}";
    

    const modalEle = <>
            <div className="splash-modal">
                <p>Feel free to use the following creadentials to log in and poke around:</p>
                <p>E : demoman@email.com 
                    &nbsp;
                    <button onClick={() => {navigator.clipboard.writeText("demoman@email.com")}}>
                        <img src={copy} alt="" />
                    </button>
                </p>
                <p>P : passwerd 
                    &nbsp;
                    <button onClick={() => {navigator.clipboard.writeText("passwerd")}}>
                        <img src={copy} alt="" />
                    </button>
                </p>
                
            </div>
        </>
    ;
    
    return (
    <div className='splash'>
        <h1>Statify {curly}</h1>
        <h2>View and compare stats about your musical taste</h2>

        { process.env.NODE_ENV === 'production' ? 
            (   
            <a href='https://statify-app.herokuapp.com/login' > Login to Spotify </a>
            ):(
                <a href='http://localhost:8000/login' > Login to Spotify </a>
            )
        }
            <h3 onClick={() => changeModal(true)}>What if I don't have a Spotify account?</h3>
                
            {modal ? modalEle : null}
            <img src={logo} className='splashimg'/>
    <p>
        {message}
        </p>
    
    
    </div>
)}