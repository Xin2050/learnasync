import React, {useState} from 'react';
import Table from "./components/Table";
import './App.css'
import $ from 'jquery';
import _ from 'lodash';

const App = () => {
    const [isrun,setIsRun] = useState(false);
    const myblocks = [];
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            myblocks.push(`ele_${i}_${j}`);
        }
    }
    const start = ()=>{
        setIsRun(true);
        const exe = new Promise((resolve) => {
            const index =Math.floor( Math.random()* Math.floor(myblocks.length));
            console.log("index==>",index);
            const v = $("#"+myblocks[index]);
            setTimeout(()=>{
                v.addClass("action");
                resolve(v);
            },Math.floor(Math.random()*100))

        }).then(
            (rs)=>{
                setTimeout(()=>{
                    rs.removeClass("action").addClass("back");
                },Math.floor(Math.random()*100))
            }
        )
        while(isrun){
            setTimeout(()=>{
                exe();
                },1000
            )

        }
    }
    const stop = ()=>{
        setIsRun(false)
    }
    return (
        <div className="main">
            <Table x={10} y={10}/>
            <button onClick={start}> Start</button>
            <button onClick={stop}> Stop</button>
        </div>
    );
};

export default App;