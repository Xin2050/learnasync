import React, {useState} from 'react';
import Table from "./components/Table";
import './App.css'
import $ from 'jquery';
import _ from 'lodash';

const App = () => {
    let isrun = false;
    const myblocks = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            myblocks.push(`ele_${i}_${j}`);
        }
    }
    const start = () => {
        isrun = true;
        const exe = ()=>{
            new Promise((resolve,reject) => {
                const index = Math.floor(Math.random() * Math.floor(myblocks.length));
                console.log("index==>", index);
                const v = $("#" + myblocks[index]);
                setTimeout(() => {
                    v.addClass("action");
                    const rs = Math.random();
                    if(rs>.5){
                        console.log("You ok!");
                        resolve(v);
                    }else{
                        console.log("You're not ok");
                        reject(v);
                    }
                }, Math.floor(Math.random() * 1000))
            }).then(
                (rs) => {
                    setTimeout(() => {
                        rs.removeClass("action").addClass("back");
                    }, Math.floor(Math.random() * 1000))
                    setTimeout(()=>{
                        rs.removeClass("back").addClass("ready");
                    },1000)
                }
            ).catch((rs)=>{
                rs.removeClass("action").addClass("error");
                setTimeout(()=>{
                    rs.removeClass("error").addClass("ready");
                },1000)
            })
        }

        const timeid = setInterval(() => {
            exe();
            if (!isrun) {
                clearInterval(timeid)
            }
        }, 10)

    }
    const stop = () => {
        isrun=false;
    }
    return (
        <div className="main">
            <Table x={10} y={10}/>
            <button onClick={() => {
                start();
            }}> Start
            </button>
            <button onClick={() => {
                stop();
            }}> Stop
            </button>
        </div>
    );
};

export default App;