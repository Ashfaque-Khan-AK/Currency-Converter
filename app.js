const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () =>{
    updateExchangeRate();
})

for (let select of dropdowns) {
    for (currCode in countryList){
   let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name==="from" && currCode =="USD") {
        newOption.selected = "selected";
    } else if (select.name==="to" && currCode =="PKR") {
        newOption.selected = "selected";
    }
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target)
    })
}   
 
const updateFlag = (element) =>{
    let currCode = element.value
    let countryCode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`
    
    let img =element.parentElement.querySelector("img");
    img.src = newSrc;

}
btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
    
})

const updateExchangeRate = async () =>{
let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amount.value =="" || amount.value < 1) {
        amtValue =1;
        amount.value ="1";
    
    }
    
    let from = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();
    let URL = `${BASE_URL}${from}.json`;
    
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[from][to];
    let finalAmount = amtValue*rate;
    msg.innerText =`${amtValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}