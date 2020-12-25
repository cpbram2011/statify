import React from 'react';
import { Doughnut } from 'react-chartjs-2';
 
export default class Graph extends React.Component {
    constructor(props){
        super(props);
    }



    render ()  {
        if (!this.props.data) return null;
        let keys = [0,0,0,0,0,0,0,0,0,0,0,0];
        let modes = [0,0]
        this.props.data.forEach(x => {
            if (!x) {
            } else {
                keys[x.key] += 1;
                
            }
        });
        window.keys = keys;
        const mydata = {
            labels: ['Ab','A','Bb','B','C','Db','D','Eb','E','F','Gb','G'],
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

        return (
            <>
            <Doughnut
                data={mydata}
                width={100}
                height={50}
                options={{ maintainAspectRatio: false }}
                />
            </>
        )
    }
}
