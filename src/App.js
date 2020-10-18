import React from 'react';
import Table from "./components/Table";
import './App.css'
import $ from 'jquery';


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
            return new Promise((resolve, reject) => {
                const index = Math.floor(Math.random() * Math.floor(myblocks.length));
                console.log("index==>", index);
                const v = $("#" + myblocks[index]);
                v.addClass("action");
                setTimeout(() => {
                    const rs = Math.random();

                    if (rs > .5) {
                        resolve(v);
                    } else {
                        reject(v);
                    }
                }, 100)
            })
        };

        const addText =(ele,v)=>{
            return new Promise((resolve,reject) => {
                setTimeout((myele,text)=>{
                    myele.text(text);
                    resolve(myele);
                },10,ele,v)
            })

        }



        const timeid = setInterval(() => {
            exe().then(
                (rs) => {
                    setTimeout((ele) => {
                        ele.removeClass("action").addClass("success");
                        setTimeout(() => {
                            ele.removeClass("success").addClass("ready");
                        }, 1000)

                    }, 1000,rs)
                    return addText(rs,"S");
                }
            ).then((rs)=>{
                setTimeout(myele=>{
                    myele.html("&nbsp");
                },1000,rs)
            }).catch((rs) => {
                setTimeout((ele)=>{
                    ele.removeClass("action").addClass("error");
                    setTimeout(() => {
                        ele.removeClass("error").addClass("ready");
                    }, 1000)
                },1000,rs)
                return addText(rs,"E");
            }).then((rs)=>{
                if(!rs){return}
                setTimeout(myele=>{
                    myele.text(" ");
                },1000,rs)
            })
            if (!isrun) {
                clearInterval(timeid)
            }
        }, 10)

    }
    const stop = () => {
        isrun = false;
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