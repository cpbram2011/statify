import React from 'react';
import Chart from 'chart.js';



export default class Graph extends React.Component {
    constructor(props){
        super(props);
    }



    render ()  {
        if (!this.props.data) return null;
        let keys = [0,0,0,0,0,0,0,0,0,0,0,0]
        this.props.data.forEach(x => {
            if (!x) {
            } else {
                keys[x.key] += 1
            };
        });

        var ctx = document.getElementById('Chart');
        if (myChart != undefined) {
            // TODO naive failed solution
            myChart.destroy();}
        var myChart = new Chart(ctx, { //Mode
            type: 'doughnut',
            data: {
                labels: ['C', 'Db', 'D', 'Eb', 'E', 'F','Gb','G','Ab','A','Bb','B'],
                datasets: [{
                    data: keys,
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

        return (
            <>
               

            </>
        )
    }
}
