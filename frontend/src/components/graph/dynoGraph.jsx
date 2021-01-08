import React, {useState, useEffect} from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

export default ({dynoData}) => {

    const [dyno, setDyno] = useState('acousticness')
    
    useEffect(() => {
        const selector = document.getElementById('selectDyno')
        selector.childNodes.forEach(button => {
            if (button.value === dyno) button.className = button.value + ' selected'
            else button.className = button.value    
        }) 
    });

    const labels = []
    for (let i = 0; i < 100; i += 5){
        labels.push(i / 100)
    }
    const currentData = {
        labels,
        datasets: [{
            data: dynoData[dyno],
            backgroundColor: '#e6194B',
        }]
    };
    const dynoOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 10
                }
            }]
        },
        responsive: false,
        maintainAspectRatio: true,
        legend: {
            display: false   
            }
    };
    window.dynoData = dynoData
    window.dyno = dyno
    return (
        <>
        <div id='selectDyno'>
            <button value='acousticness' onClick={() => setDyno('acousticness')}>Acousticness</button>
            <button value='danceability' onClick={() => setDyno('danceability')}>Danceability</button>
            <button value='energy' onClick={() => setDyno('energy')}>Energy</button>
            <button value='instrumentalness' onClick={() => setDyno('instrumentalness')}>Instrumentalness</button>
            <button value='liveness' onClick={() => setDyno('liveness')}>Liveness</button>
            <button value='speechiness' onClick={() => setDyno('speechiness')}>Speechiness</button>
            <button value='valence' onClick={() => setDyno('valence')}>Valence</button>
        </div>
        <div className='dynoGraph'>
        <Bar 
        data={currentData}
        options={dynoOptions}
        height={400}
        width={700}
        ></Bar>


        </div>
        </>
    )
}