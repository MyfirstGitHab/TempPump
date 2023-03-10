'use strict';
const image=document.querySelector(".displayed");
const PH=document.querySelector(".PH");
const PHGVP=document.querySelector(".PHGVP");
const AH=document.querySelector(".AH");
const GVP=document.querySelector(".GVP");

const tempGVP=document.querySelector(".tempGVP");
const tempWell=document.querySelector(".tempWell");
const tempBufer=document.querySelector(".tempBufer");



const processOn=document.querySelector(".processOn");
const processOff=document.querySelector(".processOff");
const ResetWell=document.querySelector(".ResetWell");
const ResetBufer=document.querySelector(".ResetBufer");
const ResetGVP=document.querySelector(".ResetGVP");

const inputTempBuf=document.querySelector("#input-temp-buf");
const inputTempBoil=document.querySelector("#input-temp-boil");
const textTempBuf=document.querySelector("#text-temp-buf");
const textTempBoil=document.querySelector("#text-temp-boil");

inputTempBuf.addEventListener("input",(event)=>{
    b=Number.parseInt(event.currentTarget.value);
    textTempBuf.textContent=b;
    console.log("B");
    console.log(b);
});
inputTempBoil.addEventListener("input",(event)=>{
    y=Number.parseInt(event.currentTarget.value);
    textTempBoil.textContent=y;
    console.log("Y");
    console.log(typeof(y));
    console.log(y);
});

let ON = false;
let processGVP;
let value=0;
let y=0;
let b=1500;
let w=2500;
let t=0;

let tWell=8;
let tdelta=3;
let tBuff;
let tminBuff=5;
let tmaxBuff=10;
let tBoil;
let tminBoil=30;
let tmaxBoil=40;


let canvas=document.getElementById("c1");
let ctx=canvas.getContext('2d');

console.log(y);
console.log(b);
console.log(w);
let f;
let modePH=false;
let modePHGVP=false;
let modeAH=false;
let modeGVP=false;

let functiunModePH=setInterval(() => {
    if(modePH){
        b=b+0.07*(1098-b);
        b=Math.round(b);
        f=b/100;
        console.log(b);
        f=f.toFixed(1);
        tempBufer.textContent=f;
    };
    if(modePH){
        w=w+0.1*(798-w);
        w=Math.round(w);
        f=w/100;
        console.log(b);
        f=f.toFixed(1);
        tempWell.textContent=f;
    };
},800);

function ReStart(){
    if (t>1200) {
        t=0;
        ctx.clearRect(0,0,1200,300);
    };
};
const SetProcessOn = () => {
    processOn.disabled=true;
    processOff.removeAttribute('disabled');
    ON=true;
    console.log('Start');
    processGVP=setInterval(() => {
        ReStart();
        t=t+1;
        if (!modeAH ){
            
            console.log("y_begin");
            console.log(y);
            value=y+0.05*(5505-y);
            console.log("y_second");
            console.log(value);
            value=Math.round(value);
            f=value/100;
            console.log("y");
            console.log(y);
            console.log("f");
            console.log(f);
            console.log(t);
            console.log(Math.floor(f));
            f=f.toFixed(1);
            tempGVP.textContent=f;
            ctx.fillRect(t,300-Math.floor(f*3),3,3);
            
        }
        if(modePHGVP || modeAH || modePH){
            b=b+0.07*(498-b);
            b=Math.round(b);
            f=b/100;
            console.log(b);
            f=f.toFixed(1);
            tempBufer.textContent=f;
        };
        if(modeAH){
            w=w+0.1*(798-w);
            w=Math.round(w);
            f=w/100;
            console.log(b);
            f=f.toFixed(1);
            tempWell.textContent=f;
        };
        // if(modeGVP){
        //     w=w+0.07*(798-w);
        //     w=Math.round(w);
        //     f=w/100;
        //     console.log(b);
        //     f=f.toFixed(1);
        //     tempWell.textContent=f;
        // }
        
        if(modeGVP || modePH){
            w=w+0.07*(798-w);
            w=Math.round(w);
            f=w/100;
            console.log(b);
            f=f.toFixed(1);
            tempWell.textContent=f;
        }
    }, 400);
};
const SetProcessOff = () => {
    processOff.disabled=true;
    processOn.removeAttribute('disabled');
    ON=false;
    clearInterval(processGVP);
};


const SetPH = () => {
    image.setAttribute("src","./imeg/ПХ.bmp")
    PH.disabled=true;
    PHGVP.removeAttribute('disabled');
    AH.removeAttribute('disabled');
    GVP.removeAttribute('disabled'); 
    modePH=true;
    modePHGVP=false;
    modeAH=false;
    modeGVP=false;
    monitoring();

    functiunModePH;
};
const SetPHGVP = event => {
    image.setAttribute("src","./imeg/ПХГВП.bmp");
    PH.removeAttribute('disabled');
    PHGVP.disabled=true;
    AH.removeAttribute('disabled');
    GVP.removeAttribute('disabled');
    modePH=false;
    modePHGVP=true;
    modeAH=false;
    modeGVP=false;
    monitoring();

    clearInterval(functiunModePH);
};
const SetAH = event => {
    image.setAttribute("src","./imeg/АХ.bmp");
    PH.removeAttribute('disabled');
    PHGVP.removeAttribute('disabled');
    AH.disabled=true;
    GVP.removeAttribute('disabled');
    modePH=false;
    modePHGVP=false;
    modeAH=true;
    modeGVP=false;
    monitoring();

    clearInterval(functiunModePH);
};
const SetGVP = event => {
    image.setAttribute("src","./imeg/ГВП.bmp")
    PH.removeAttribute('disabled');
    PHGVP.removeAttribute('disabled');
    AH.removeAttribute('disabled');
    GVP.disabled=true;
    modePH=false;
    modePHGVP=false;
    modeAH=false;
    modeGVP=true;
    monitoring();

    clearInterval(functiunModePH);
};



PH.addEventListener("click",SetPH);
PHGVP.addEventListener("click",SetPHGVP);
AH.addEventListener("click",SetAH);
GVP.addEventListener("click",SetGVP);

// processOn.addEventListener("click",SetProcessOn);
// processOff.addEventListener("click",SetProcessOff);

// let y=25;
// const tempGVP=document.querySelector(".tempGVP");
// const process=document.querySelector(".process");
// process.addEventListener("click",(e)=>{
//     y=y+0.05*(55.1-y);
//     console.log("1 "+y);
//     y=y.toFixed(2);
//     console.log("2 "+y);
//     y=Number.parseFloat(y);
//     console.log("3 "+y);
//     tempGVP.textContent=y;
// });

processOn.addEventListener("click",SetProcessOn);
processOff.addEventListener("click",SetProcessOff);

ResetWell.addEventListener("click",()=>{
    tempWell.textContent=25;
    w=2500;
});
ResetBufer.addEventListener("click",()=>{
    tempBufer.textContent=25;
    b=2500;
});
ResetGVP.addEventListener("click",()=>{
    tempGVP.textContent=25;
    y=2500;
});

const monitoring =()=>{
    console.log("modePH "+ modePH)
console.log("modePHGVP "+ modePHGVP)
console.log("modeAH "+ modeAH)
console.log("modeGVP "+ modeGVP)
};


// let canvas=document.getElementById('c1');
// let ctx=canvas.getContext('2b');
// function draw() {
//     ctx.fiiRect(x,y,2,2);
// };


// let canvas=document.getElementById("c1");
// let ctx=canvas.getContext('2d');

// ctx.fillRect(y,t,1,1);
// ctx.fillRect(100,50,150,75); //ctx.fillRect(x,y,width,height); Робимо прямокутник
// ctx.fillStyle='red';
// ctx.fillRect(251,50,150,75);
// ctx.clearRect(150,75,150,150);//стераємо
// ctx.rect(50,50,50,50);
// ctx.stroke();
// ctx.strokeStyle='green';
// ctx.lineWidth="5";
// ctx.stroke();
// ctx.fillStyle='orange';
// ctx.fill();
// // Робим лінію
// ctx.beginPath();
// ctx.strokeStyle='black';
// ctx.lineWidth="11";
// ctx.lineCap='square';
// ctx.moveTo(0,0);
// ctx.lineTo(50,50);
// ctx.stroke();
// ctx.beginPath();
// ctx.strokeStyle='red';
// ctx.lineWidth="10";
// ctx.lineCap='round';
// ctx.moveTo(0,0);
// ctx.lineTo(500,40);
// ctx.stroke();

// ctx.beginPath();
// ctx.strokeStyle='red';
// ctx.lineWidth="10";
// ctx.lineCap='round';
// ctx.moveTo(600,10);
// ctx.lineTo(700,10);
// ctx.stroke();

// ctx.beginPath();
// ctx.strokeStyle='blue';
// ctx.lineWidth="10";
// ctx.lineCap='square';
// ctx.moveTo(600,30);
// ctx.lineTo(700,30);
// ctx.stroke();

// ctx.beginPath();
// ctx.strokeStyle='blue';
// ctx.lineWidth="10";
// ctx.lineCap='butt';
// ctx.moveTo(600,50);
// ctx.lineTo(700,50);
// ctx.lineTo(700,80);
// ctx.stroke();
// ctx.clearRect(0,0,800,400);//стераємо

// ctx.beginPath();
// ctx.moveTo(50,150);
// ctx.lineTo(150,50);
// ctx.lineTo(200,150);
// // ctx.lineTo(50,150);
// ctx.lineWidth="4"
// ctx.lineCap='round'
// ctx.fillStyle="orange"
// ctx.closePath();
// ctx.stroke();

// ctx.fill();