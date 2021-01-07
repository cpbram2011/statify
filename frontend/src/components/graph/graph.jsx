import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
 
export default class Graph extends React.Component {
    

    

    render ()  {
        if (!this.props.data) return null;


        let keys = [0,0,0,0,0,0,0,0,0,0,0,0];
        const keyArr = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B',];
        let modes = [0,0];
        let tempos = {};
        for (let i = 40; i < 241; i += 10) tempos[i] = 0;


        //
        let acousticness = []
        let danceability = []
        let energy = []
        let instrumentalness = []
        let liveness = []
        let speechiness = []
        let valence = []


        let loudness = [] //roughly -30 to 0
        let duaration = [] //in ms


        //main iterator
        this.props.data.forEach(x => {
            if (!x) {
            } else {
                keys[x.key] += 1;
                modes[x.mode] += 1;
                let tempo = Math.floor(x.tempo);
                tempo -= (tempo % 10)
                tempos[tempo] += 1
            }
        });

        //graph datasets
        const keyData = {
            labels: keyArr,
            datasets: [{
                data: keys,
                backgroundColor: [
                    '#e6194B',
                    '#f58231',
                    '#ffe119',
                    '#bfef45',
                    '#3cb44b',
                    '#469990',
                    '#42d4f4',
                    '#4363d8',
                    '#000075',
                    '#911eb4',
                    '#f032e6',
                    '#b20035',
                  ],
            }]
        };

        const modeData = {
            labels: ['Major', 'Minor'],
            datasets: [{
                data: modes,
                backgroundColor: [
                    '#e6194B',
                    '#4363d8',
                ]
            }]
        };

        const tempoData = {
            labels: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220],
            datasets: [{
                data: Object.values(tempos),
                backgroundColor: '#e6194B'
            }]
        };

        //graph option objects
        const barOptions = {
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
        


        //get average modes
        const findIndexOfGreatest = (array) => {
            var greatest;
            var indexOfGreatest;
            for (var i = 0; i < array.length; i++) {
              if (!greatest || array[i] > greatest) {
                greatest = array[i];
                indexOfGreatest = i;
              }
            }
            return indexOfGreatest;
          }

        const favKeyIndex = findIndexOfGreatest(keys)
        const favKey = keyArr[favKeyIndex]
        let faveMode
        if (modes[0] === modes[1]){
            faveMode= 'You like Major and Minor Keys equally '
        } else if (modes[0] < modes[1]) {
            faveMode= 'You prefer Minor Keys'
        } else {
            faveMode= 'You prefer Major Keys'
        }
        const favTempo = Object.keys(tempos).reduce((a, b)=>{ return tempos[a] > tempos[b] ? a : b });
        let speed;
        if (favTempo < 71) {
            speed = 'slow';
        } else if (favTempo < 121) {
            speed = 'walking pace';
        } else if (favTempo < 180) {
            speed = 'fast';
        } else {
            speed = 'very fast';
        }

        return (
            <>
        <div className='graphContainer'>
            <div id="donut">
                <p>Your favorite songs are in the key of {favKey}</p>
            <Doughnut
                data={keyData}
                height={400}
                width={400}
                options={{ maintainAspectRatio: true,
                responsive: false,
                
                 legend: {
                 display: false   
                 }
                }}
                />
            </div>
            <div id='modeChart'>
                {faveMode}
                <Bar
                height={400}
                width={400}
                    data={modeData}
                    options={barOptions}
                    />

            </div>
            <div id='tempoChart'>
                <p>You prefer {speed} music ({favTempo} bpm)</p>
                <Bar
                height={400}
                width={400}
                    data={tempoData}
                    options={barOptions}
                    />

            </div>
            <br/>


        </div>
        </>
        )
    }
}
