import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Doughnut, Bar } from 'react-chartjs-2';
import dynoDescriptions from './dynoText';


export default ({dynoData}) => {

    const [dyno, setDyno] = useState('acousticness')
    

    const tracks = useSelector(state => state.entities.tracks)

    const oneFive = n => {  //16
        n -= (n % 5)  //15
        return (n / 5); //3
    }

    const labels = []
    for (let i = 0; i < 100; i += 5){
        labels.push(i / 100)
    }

    const avg = arr => {
        let ans =  0;
        let c = 0
        arr.forEach((x,i) => {
            ans += labels[i] * x;
            c += x
        });
        ans /= c;
        return Math.floor(ans * 100) / 100
    }
    
    const popularity = new Array(20).fill(0);
    

    if (tracks[0])
        tracks.forEach(item => {
            popularity[oneFive(item.popularity)]++;
        });
        dynoData['popularity'] = popularity;

    window.tracks = tracks
    window.dynoData = dynoData
    useEffect(() => {
        const selector = document.getElementById('selectDyno')
        selector.childNodes.forEach(button => {
            if (button.value === dyno) button.className = button.value + ' selected'
            else button.className = button.value    
        });
    });

    
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
                },
                gridLines: {
                    color: "#969696"
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false   
            }
    };
    window.dynoData = dynoData
    window.dyno = dyno
    return (
        <div className='dynoParent'>
            
        <div id='selectDyno'>
            <button value='acousticness' onClick={() => setDyno('acousticness')}>Acousticness</button>
            <button value='danceability' onClick={() => setDyno('danceability')}>Danceability</button>
            <button value='energy' onClick={() => setDyno('energy')}>Energy</button>
            <button value='instrumentalness' onClick={() => setDyno('instrumentalness')}>Instrumentalness</button>
            <button value='liveness' onClick={() => setDyno('liveness')}>Liveness</button>
            <button value='speechiness' onClick={() => setDyno('speechiness')}>Speechiness</button>
            <button value='valence' onClick={() => setDyno('valence')}>Valence</button>
            <button value='popularity' onClick={() => setDyno('popularity')}>Popularity</button>
        </div>
        <div className="centerDyno">
        <div className='dynoGraph'>
        <Bar 
        data={currentData}
        options={dynoOptions}
        // height={400}
        // width={700}
        ></Bar>

        </div>
        <div className='dynoText'>
            <p id="average">Average {dyno}: {avg(dynoData[dyno])}</p>
            <p className='descriptions'>
                {dynoDescriptions(dyno)}
            </p>

        </div>
       </div>
        </div>
    )
}