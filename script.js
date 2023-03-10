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

const inputTempBuf=document.querySelector(".buf");
const inputTempBoil=document.querySelector(".boil");
const inputTempWell=document.querySelector(".well");

const inputTempDelta=document.querySelector(".delta");
const ShowDelta=document.querySelector(".ShowDelta");

const inputTemer1=document.querySelector(".Temer1");
const ShowTimer1=document.querySelector(".ShowTimer1");

const inputTemer2=document.querySelector(".Temer2");
const ShowTimer2=document.querySelector(".ShowTimer2");

let canvas=document.getElementById("c1");
let ctx=canvas.getContext('2d');
// const textTempBuf=document.querySelector("#text-temp-buf");
// const textTempBoil=document.querySelector("#text-temp-boil");
// const textTempWell=document.querySelector("#text-temp-well");


let process;

let tWell=50;
let tdelta=10;

let tBuff=80;
let tminBuff=50;
let tmaxBuff=100;

let tBoil=350;
let tminBoil=300;
let tmaxBoil=400;

let M100=false;
let M101=false;
let M102=false;
let M103=false;

let modePH=false;
let modePHGVP=false;
let modeAH=false;
let modeGVP=false;

let sT1=false;
let T1=false;
let T1Delay;
let T1Sum=0;

let setT2=false;
let T2=false;
let T2Delay;
let T2Sum=0;

let time=0;


// function timerJs(setTimer,id,count,Sum){
//     if (setTimer==true){
//         if (Sum>=count){
//             id==true
//         } else {
//             console.log(Sum)
//             Sum=Sum+1;
//             return Sum;
//             console.log("add")
//             console.log(Sum)
//         };
//     } else {
//         Sum=0;
//         id=0;
//     };
//     console.log("setTimer "+setTimer)
//     console.log("SSSSSS " +Sum )
// };

const SetProcessOn = () => {
    processOn.disabled=true;
    processOff.removeAttribute('disabled');
    // console.log('Start');
    process=setInterval(() => {
        if(tBuff<=tminBuff){
            M102=false;
            M103=true; //викл ох
        };
        if (tBuff>=tmaxBuff){
            M102=true; //вкл ох
            M103=false;
        };
        if(tBoil>=tmaxBoil){
            M100=false;
            M101=true;
            modeGVP=false;
        };
        if(tBoil<=tminBoil){
            M100=true;
            M101=false;
            modeGVP=true;
        };
        if(M100==false && M102==true && M103==false && modeAH==false){modePH=true;} else {modePH=false;};
        if(M100==false && M102==true && M103==false){sT1=true;} else {sT1=false;};
        if(T1==true && (tdelta+tWell)>=tBuff && modeAH==false){modeAH=true;};
        if(T1==false && modeAH==true){modeAH=false;};
        if(M100==true && M101==false){setT2=true;} else {setT2=false;};
        if(T2==true && tBuff>=tWell){modePHGVP=true;};
        if((M100==false && M101==true) || tminBuff>=tBuff){modePHGVP=false;};
        //  Таймер 1
        if (sT1==true){
            if (T1Sum>=T1Delay){
                T1=true;
            } else {
                T1Sum=T1Sum+1;
            };
        } else if(sT1==false){
            
            T1Sum=0;
            T1=false;
        };
        //  Таймер 2
        if (setT2==true){
            if (T2Sum>=T2Delay){
                T2=true
            } else {
                T2Sum=T2Sum+1;
            };
        } else {
            T2Sum=0;
            T2=false;
        };
        
        if((tdelta+tWell)>=tBuff){
            ShowDelta.textContent=`Дельта t=${tdelta/10}___${(tdelta+tWell)/10}>=${tBuff/10}`;
        } else {
            ShowDelta.textContent=`Дельта t=${tdelta/10}___${(tdelta+tWell)/10}<${tBuff/10}`;
        }
        ShowTimer1.textContent=`Таймер 1 t=${T1Delay}с._____${T1Sum}с.`;
        ShowTimer2.textContent=`Таймер 2 t=${T2Delay}с._____${T2Sum}с.`;


        if(modePH==true){
            image.setAttribute("src","./imeg/ПХ.bmp")
            PH.classList.add("ActivMode");
            PHGVP.classList.remove("ActivMode");
            AH.classList.remove("ActivMode");
            GVP.classList.remove("ActivMode"); 
            console.log("ПХ");
        };
        if(modePHGVP==true){
            image.setAttribute("src","./imeg/ПХГВП.bmp");
            PH.classList.remove("ActivMode");
            PHGVP.classList.add("ActivMode");
            AH.classList.remove("ActivMode");
            GVP.classList.remove("ActivMode");
            console.log("ПХГВП");
        };
        if(modeAH==true){
            image.setAttribute("src","./imeg/АХ.bmp");
            PH.classList.remove("ActivMode");
            PHGVP.classList.remove("ActivMode");
            AH.classList.add("ActivMode");
            GVP.classList.remove("ActivMode");
            console.log("АХ");
        };
        if(modeGVP==true && modePHGVP!=true){
            image.setAttribute("src","./imeg/ГВП.bmp")
            PH.classList.remove("ActivMode");
            PHGVP.classList.remove("ActivMode");
            AH.classList.remove("ActivMode");
            GVP.classList.add("ActivMode");
            console.log("ГВП");
        };
        if(modeGVP!=true && modeAH!=true && modePHGVP!=true && modePH!=true){
            PH.classList.remove("ActivMode");
            PHGVP.classList.remove("ActivMode");
            AH.classList.remove("ActivMode");
            GVP.classList.remove("ActivMode");
            console.log("NON");
        };
        console.log("****");
        console.log("M100 "+M100);
        console.log("M101 "+M101);
        console.log("M102 "+M102);
        console.log("M103 "+M103);
        ctx.fillStyle='red';
        ctx.fillRect(time,(50-(Math.round(tBoil/10)))-1,1,1);
        ctx.fillStyle='blue';
        ctx.fillRect(time,(50-(Math.round(tBuff/10)))-1,1,1);
        ctx.fillStyle='green';
        ctx.fillRect(time,(50-(Math.round(tWell/10)))-1,1,1);
        time+=1;
        if(time==250){
            time=0;
            ctx.clearRect(0,0,250,50);
        };
        console.log("time "+Math.round(50-tBoil/10));


    },500);
};

const SetProcessOff = () => {
    processOff.disabled=true;
    processOn.removeAttribute('disabled');
    clearInterval(process);
};

processOn.addEventListener("click",SetProcessOn);
processOff.addEventListener("click",SetProcessOff);

inputTempBuf.addEventListener("input",(event)=>{
    tBuff=Number.parseInt(event.currentTarget.value);
    // textTempBuf.textContent=tBuff/10;
    tempBufer.textContent=tBuff/10;
});
inputTempBoil.addEventListener("input",(event)=>{
    tBoil=Number.parseInt(event.currentTarget.value);
    // textTempBoil.textContent=tBoil/10;
    tempGVP.textContent=tBoil/10;
});
inputTempWell.addEventListener("input",(event)=>{
    tWell=Number.parseInt(event.currentTarget.value);
    // textTempWell.textContent=tWell/10;
    tempWell.textContent=tWell/10;
});

inputTempDelta.addEventListener("input",(event)=>{
    tdelta=Number.parseInt(event.currentTarget.value);
    // textTempWell.textContent=tWell/10;
    ShowDelta.textContent=`Дельта t=${tdelta/10}`;
});

inputTemer1.addEventListener("input",(event)=>{
    T1Delay=Number.parseInt(event.currentTarget.value);
    ShowTimer1.textContent=`Таймер 1 t=${T1Delay}`;
});

inputTemer2.addEventListener("input",(event)=>{
    T2Delay=Number.parseInt(event.currentTarget.value);
    ShowTimer2.textContent=`Таймер 2 t=${T2Delay}`;
});

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