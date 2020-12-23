import React from 'react';
import {connect} from 'react-redux';

const mSTP = state => ({
    data: state.entities.features
});



class Graph extends React.Component {
    constructor(props){
        super(props)
    }



    render ()  {
        debugger
        return (
            <>
                <h1> Helloooooo</h1>


            </>
        )
    }
}

export default connect(mSTP, null)(Graph)