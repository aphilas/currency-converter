import idb from 'idb';

let dbPromise = idb.open('test-db', 1, function (upgradeDb) {
  switch (upgradeDb.oldVersion) {
  case 0:
    upgradeDb.createObjectStore('currencies', { keyPath: 'pair' });
  }
});

const url = 'https://free.currencyconverterapi.com/api/v5/currencies';

let fromSelect = document.getElementById('fromSelect');
let toSelect = document.getElementById('toSelect');

let fromInput = document.getElementById('fromInput');
let toInput = document.getElementById('toInput');

function updateOutput (event) {
  if (isNaN(fromInput.value) || fromInput.value < 0) {
    toInput.value = 'Please enter a number greater than zero';
    toInput.style.fontSize = '1rem';
  }
  if (fromInput.value !== '') {
    convert(fromSelect.value, toSelect.value, fromInput.value);
    toInput.style.fontSize = '2rem';
  }
}

function clearOutput (event) {
  let key = event.key;
  if (key === 8 || key === 48 || fromInput.value === '') {
    toInput.value = '';
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

    currencies = Object.values(currencies);
    currencies.sort((a, b) => {
      var textA = a.currencyName.toUpperCase();
      var textB = b.currencyName.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    for (let el of currencies) {
      let currencyName = el.currencyName;
      let currencyId = el.id;

      let option = document.createElement('option');
      if (currencyName.length > 20) {
        currencyName = `${currencyName.substring(0, 19)} ...`;
      }
      option.innerHTML = `${currencyName} (${currencyId})`;
      option.value = currencyId;

      var optionClone = option.cloneNode(true);

      fromSelect.appendChild(option);
      toSelect.appendChild(optionClone);
    }
  })
  .catch(err => console.log(err));

function convert (from, to, amt) {
  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}`;

  if (window.fetch(url)){
    let result = window.fetch(url)
    .then(response => response.json())
    .then(data => {
      let conversion = data.results;

      let value = conversion[Object.keys(conversion)].val;

      let converted = amt * value;
      converted = converted.toFixed(2);

      toInput.value = converted;
    });
  }else{
    let pairToConvert = `${from}_${to}`;

    dbPromise.then(function(db) {
      let tx = db.transaction('currencies', 'readwrite');
      let keyValStore = tx.objectStore('currencies');

      let result = keyValStore.get(pairToConvert);

      let value = result.value;
      let converted = amt * value;
      converted = converted.toFixed(2);

      toInput.value = converted;
      return tx.complete;
    });
  }
}

// service worker registration
function registerServiceWorker () {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('sw.js').then(function (reg) {
    console.log('service worker installed successfully');

    if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      console.log('service worker waiting');
      return;
    }

    if (reg.installing) {
      console.log('service worker installing');
      return;
    }

    reg.addEventListener('updatefound', function () {
      console.log('service worker updated');
    });
  });

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload".
  var refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    location.reload();
    refreshing = true;
  });
}

registerServiceWorker();

// indexed db

(function(){
  const url = '';

  function fetchAndStoreCurrencies(){
    const url = 'https://free.currencyconverterapi.com/api/v5/currencies';
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      let currencies = data.results;
      return currencies;
    })
    .then(currencies => {
      currenciesArray = Object.values(currencies);
      let currenciesIds = [];
      
      for (let currency of currenciesArray){
        currenciesIds.push(currency.id);
      }

      return currenciesIds;
    }).then(currenciesIds => {
      let pairs = [];

      for (let i = 0; i < currenciesIds.length - 1; i++) {
        for (let j = i + 1; j < currenciesIds.length; j++) {
          pairs.push(`${currenciesIds[i]}_${currenciesIds[j]}`);
        }
      }

      return pairs;
    }).then(pairs => {
      for (let i = 0; i < pairs.length; i++){
        let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${pairs[i]}`;
        
        fetch(url)
          .then(response => response.json())
          .then(res => {
            let val = res.results;
            val = Object.values(val)[0].val;
            let valObj = {
              pair: pairs[i],
              value: val
            };
            console.log(valObj);
            return valObj;
          })
          .then(valObj => {

            dbPromise.then(function(db) {
              let tx = db.transaction('currencies', 'readwrite');
              let keyValStore = tx.objectStore('currencies');
              keyValStore.put(valObj);
              return tx.complete;
            });

          });
      }
    });
  }

  fetchAndStoreCurrencies();

})();
