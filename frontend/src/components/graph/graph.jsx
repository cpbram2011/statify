import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
 
export default class Graph extends React.Component {
    constructor(props){
        super(props);
    }

    

    render ()  {
        if (!this.props.data) return null;
        let keys = [0,0,0,0,0,0,0,0,0,0,0,0];
        const keyArr = ['Ab','A','Bb','B','C','Db','D','Eb','E','F','Gb','G'];
        let modes = [0,0];
        let tempos = {
            40: 0,
            50: 0,
            60: 0,
            70: 0,
            80: 0,
            90: 0,
            100: 0,
            110: 0,
            120: 0,
            130: 0,
            140: 0,
            150: 0,
            160: 0,
            170: 0,
            180: 0,
            190: 0,
            200: 0,
            210: 0,
            220: 0,
        };

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
        const tempoData = {
            labels: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220],
            datasets: [{
                data: Object.values(tempos),
                backgroundColor: '#e6194B'
            }]
        }
        const modeData = {
            labels: ['Major', 'Minor'],
            datasets: [{
                data: modes,
                backgroundColor: [
                    '#e6194B',
                    '#4363d8',
                ]
            }]
        }
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
