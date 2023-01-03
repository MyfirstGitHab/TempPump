console.log("Hello")
const image=document.querySelector(".displayed");
const PH=document.querySelector(".PH");
const PHGVP=document.querySelector(".PHGVP");
const AH=document.querySelector(".AH");
const GVP=document.querySelector(".GVP");

console.log(image.getAttribute);

const SetPH = () => {
    image.setAttribute("src","./imeg/ПХ.bmp")
    PH.disabled=true;
    PHGVP.removeAttribute('disabled');
    AH.removeAttribute('disabled');
    GVP.removeAttribute('disabled');
    
};

const SetPHGVP = event => {
    image.setAttribute("src","./imeg/ПХГВП.bmp");
    PH.removeAttribute('disabled');
    PHGVP.disabled=true;
    AH.removeAttribute('disabled');
    GVP.removeAttribute('disabled');
};
const SetAH = event => {
    image.setAttribute("src","./imeg/АХ.bmp");
    PH.removeAttribute('disabled');
    PHGVP.removeAttribute('disabled');
    AH.disabled=true;
    GVP.removeAttribute('disabled');
};
const SetGVP = event => {
    image.setAttribute("src","./imeg/ГВП.bmp")
    PH.removeAttribute('disabled');
    PHGVP.removeAttribute('disabled');
    AH.removeAttribute('disabled');
    GVP.disabled=true;
};



PH.addEventListener("click",SetPH);
PHGVP.addEventListener("click",SetPHGVP);
AH.addEventListener("click",SetAH);
GVP.addEventListener("click",SetGVP);


