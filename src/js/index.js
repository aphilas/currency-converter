const url = 'https://free.currencyconverterapi.com/api/v5/currencies';

let fromSelect = document.getElementById('fromSelect');
let toSelect = document.getElementById('toSelect');

let fromInput = document.getElementById('fromInput');
let toInput = document.getElementById('toInput');

function updateOutput(event){
  if (fromInput.value != ""){
    console.log("event triggered");
    convert(fromSelect.value, toSelect.value, fromInput.value);
  }
}

function clearOutput(event){
  let key = event.key;
  if (key == 8 || key == 48 || fromInput.value == ""){
    toInput.value="";
  }
}

fromInput.addEventListener('keyup', updateOutput);
fromInput.addEventListener('keyup', clearOutput);
fromSelect.addEventListener('change', updateOutput);
toSelect.addEventListener('change', updateOutput);


fetch(url)
  .then(response => response.json())
  .then(data => {
    let currencies = data.results;
    let currencyNames = [];
    for (let index in currencies){
      let currencyName = currencies[index].currencyName;
      let currencyId = currencies[index].id;

      let option = document.createElement('option');
      option.innerHTML = currencyName;
      option.value = currencyId;

      var optionClone = option.cloneNode(true);

      fromSelect.appendChild(option);
      toSelect.appendChild(optionClone);
    }
  })
  .catch(err => console.log(err));
  

function convert(from, to, amt){

  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    let conversion = data.results;

    let value = conversion[Object.keys(conversion)].val;

    let converted = amt * value;
    toInput.value = converted.toFixed(2);
  });
}