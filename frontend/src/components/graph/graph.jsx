import React from 'react';
import { Doughnut, Bar, defaults } from 'react-chartjs-2';
 import DynoGraph from './dynoGraph';
export default class Graph extends React.Component {
    

    render ()  {
        defaults.global.defaultFontColor = 'green';
        if (!this.props.data) return null;


        let keys = [0,0,0,0,0,0,0,0,0,0,0,0];
        const keyArr = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B',];
        let modes = [0,0];
        let tempos = {};
        for (let i = 40; i < 241; i += 10) tempos[i] = 0;


        //
        let acousticness = new Array(20).fill(0);
        let danceability = new Array(20).fill(0);
        let energy = new Array(20).fill(0);
        let instrumentalness = new Array(20).fill(0);
        let liveness = new Array(20).fill(0);
        let speechiness = new Array(20).fill(0);
        let valence = new Array(20).fill(0);

        let loudness = new Array(20).fill(0); //roughly -30 to 0
        let duaration = new Array(20).fill(0);//in ms


        const zeroFive = n => {  //.169
            n = Math.floor(n * 100)   //16
            n -= (n % 5)  //15
            return (n / 5);
        }
        //main iterator
        this.props.data.forEach(x => {
            if (!x) {
            } else {
                keys[x.key] += 1;
                modes[x.mode] += 1;
                let tempo = Math.floor(x.tempo);
                tempo -= (tempo % 10)
                tempos[tempo] += 1

                acousticness[zeroFive(x.acousticness)]++;
                danceability[zeroFive(x.danceability)]++;
                energy[zeroFive(x.energy)]++;
                instrumentalness[zeroFive(x.instrumentalness)]++;
                liveness[zeroFive(x.liveness)]++;
                speechiness[zeroFive(x.speechiness)]++;
                valence[zeroFive(x.valence)]++;
            }

        });
        const dynoData = {
            acousticness,
            danceability,
            energy,
            instrumentalness,
            liveness,
            speechiness,
            valence
        }

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
        
        //TODO move gradient WETness
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d')
        canvas.width = 300;
        canvas.height = 300;
        var gradient = context.createLinearGradient(0, 0, 300, 0);
        gradient.addColorStop(0, "rgb(0, 77, 255)");
        gradient.addColorStop(0.5505050505050505, "rgb(114, 255, 86)");
        gradient.addColorStop(1, "rgb(255, 20, 20)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 300, 300);


        const tempoData = {
            labels: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220],
            datasets: [{
                data: Object.values(tempos),
                backgroundColor: gradient
            }]
        };

        //graph option objects
        const modeOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,

                        suggestedMax: 10
                    },
                    gridLines: {
                        color: '#969696'

                    }

                }]
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false   
                }
        };

        const tempoOptions = {
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
                indexOfGreatest = [i];
              } else if (array[i] === greatest) {
                  indexOfGreatest.push(i)
              }
            }
            return indexOfGreatest;
          }

        const favKeyIndex = findIndexOfGreatest(keys)
        const favKey = favKeyIndex.map(i => keyArr[i])
        let faveMode
        if (modes[0] === modes[1]){
            faveMode= 'Equal presence of Major & Minor'
        } else if (modes[0] < modes[1]) {
            faveMode= 'Most Common Mode: Minor'
        } else {
            faveMode= 'Most Common Mode: Major'
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

                {favKey.length === 1 ? (
                    <p>Most Common Key: {favKey}</p>

                ) : (
                    <p>Most Common Keys: {favKey.map((x, i)=>{ 
                        
                        if (i != favKey.length -1) return x + ' & ';
                        else return x
                         
                    })}</p>
                )}
            <Doughnut
                data={keyData}
                height={400}
                width={420}
                options={{ maintainAspectRatio: true,
                    responsive: true,
                    
                    legend: {
                        display: false   
                    },
                    elements: {
                        arc: {
                            borderWidth: 0
                        }
                    }
                }}
                />
                <p id='keysig'>♯/♭</p>
            </div>
            <div id='modeChart'>
                <p>{faveMode}</p>
                <Bar
                height={400}
                width={420}
                    data={modeData}
                    options={modeOptions}
                    />

            </div>
            <div id='tempoChart'>
                <p>Average Tempo: {favTempo} bpm ({speed})</p>
                <Bar
                height={400}
                width={420}
                    data={tempoData}
                    options={tempoOptions}
                    />

            </div>
            <br/>

        </div>
            <DynoGraph dynoData={dynoData} />
        </>
        )
    }
}
