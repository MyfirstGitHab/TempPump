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

let ON = false;
let processGVP;
let y=2500;
let b=2500;
let w=2500;

console.log(y)
console.log(b)
console.log(w)
let f;
let modePH=false;
let modePHGVP=false;
let modeAH=false;
let modeGVP=false;




const SetProcessOn = () => {
    processOn.disabled=true;
    processOff.removeAttribute('disabled');
    ON=true;
    processGVP=setInterval(() => {
        if (!modeAH){
            y=y+0.05*(5505-y);
            y=Math.round(y);
            f=y/100;
            console.log(y);
            f=f.toFixed(1);
            tempGVP.textContent=f;

        }
        if(modePHGVP || modeAH){
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
        }
        // if(modeGVP){
        //     w=w+0.07*(798-w);
        //     w=Math.round(w);
        //     f=w/100;
        //     console.log(b);
        //     f=f.toFixed(1);
        //     tempWell.textContent=f;
        // }
        
        if(modeGVP){
            w=w+0.07*(798-w);
            w=Math.round(w);
            f=w/100;
            console.log(b);
            f=f.toFixed(1);
            tempWell.textContent=f;
        }
    }, 800);
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



