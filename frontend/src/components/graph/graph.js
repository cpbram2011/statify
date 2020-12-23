import React from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js';


const mSTP = state => {
    debugger
    return ({
    data: state.entities.features
})};



class Graph extends React.Component {
    constructor(props){
        super(props)
        
    }



    render ()  {
        const data = this.props.data;
        setTimeout((data) => {
            
            let keys = [0,0,0,0,0,0,0,0,0,0,0,0]
            debugger
            var ctx = document.getElementById('Chart').getContext('2d');
            var myChart = new Chart(ctx, { //Mode
                type: 'pie',
                data: {
                    labels: ['C', 'Db', 'D', 'Eb', 'E', 'F','Gb','G','Ab','A','Bb','B'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 0, 3, 0, 2, 3, 3, 4, 2, 3, 2, 12],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [],
                        borderWidth: 1
                    }]
                },
                options: {}
            });
        }, 1);

        return (
            <>
                <canvas id="Chart" width="400" height="400"></canvas>


            </>
        )
    }
}

export default connect(mSTP, null)(Graph)