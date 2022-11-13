$(document).ready(function () {
  var url = window.location.href;
  console.log(url);
  var params = getAllUrlParams(url);
  console.log(params);

  var eventCards = document.querySelector("#eventCards");

  var numberOfEvents = 5;

  // reference: https://www.sitepoint.com/get-url-parameters-with-javascript/
  function getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
    // we'll store the parameters here
    var obj = {};
    // if query string exists
    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split("#")[0];
      // split our query string into its component parts
      var arr = queryString.split("&");
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split("=");
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof a[1] === "undefined" ? true : a[1];
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === "string")
          paramValue = paramValue.toLowerCase();
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, "");
          if (!obj[key]) obj[key] = [];
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === "string") {
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }

    return obj;
  }

  function displayEvents(data) {
    console.log("HERE", data);

    // if !data.priceRanges[0], display "see link below"
    // var price = data.priceRanges[0]
    // console.log(price.min + '-' + price.max + ' ' + price.currency)

    var card = document.createElement("div");
    eventCards.appendChild(card);

    console.log(data.name);
    var eventTitle = document.createElement("h2");
    eventTitle.textContent = `${data.name}`;
    card.appendChild(eventTitle);

    console.log(data.classifications[0].subGenre.name);
    var eventSubGenre = document.createElement("p");
    eventSubGenre.textContent = `Sub-Genre: ${data.classifications[0].subGenre.name}`;
    card.appendChild(eventSubGenre);

    console.log(data.priceRanges);
    var eventPrice = document.createElement("p");
    if (data.priceRanges) {
      var price = data.priceRanges[0];
      eventPrice.textContent = `${price.min}-${price.max} ${price.currency}`;
    } else {
      eventPrice.textContent = "For more info, visit link below";
    }
    card.appendChild(eventPrice);

    var dates = data.dates.start;
    console.log(dates.localDate + " " + dates.localTime);
    var eventDate = document.createElement("p");
    eventDate.textContent = `Date: ${dates.localDate} ${dates.localTime}`;
    card.appendChild(eventDate);

    var location = data._embedded.venues[0];
    console.log(
      location.name +
        location.address.line1 +
        location.city.name +
        location.country.countryCode +
        location.postalCode
    );
    var eventLocation = document.createElement("p");
    eventLocation.textContent = `Location: ${location.name}`;
    card.appendChild(eventLocation);

    var eventAddress = document.createElement("p");
    eventAddress.textContent = `Address: ${location.address.line1} ${location.city.name}, ${location.country.countryCode} ${location.postalCode}`;
    card.appendChild(eventAddress);

    console.log(data.url);
    var eventUrl = document.createElement("a");
    eventUrl.textContent = `Get Tickets: ${data.url}`;
    eventUrl.href = data.url;
    card.appendChild(eventUrl);
  }

  pullBands();
  //render available options from api, hover over options display detail card
  function pullBands(res) {
    //TODO - findout correct format for genreId param and startDateTime param - can use classificationName parameter
    //TODO: validate options before fetching
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?city=${params.city}&startDateTime=${params.date}:00Z&classificationName=${params.genre}&radius=100&size=${numberOfEvents}&apikey=UrzgZnCWVNTGuF7NQOaiNiHxt2Kjh8AI`
    )
      .then((res) => res.json())
      .then((bandData) => {
        renderBands(bandData);
        function renderBands(bandData) {
          console.log(bandData._embedded.events);

          for (var i = 0; i < bandData._embedded.events.length; i++) {
            displayEvents(bandData._embedded.events[i]);
            var history = localStorage.getItem("history");
            if (history === null) {
              history = [bandData._embedded.events];
              localStorage.setItem("history", JSON.stringify(history));
            } else {
              history = JSON.parse(history);
              history.push(bandData._embedded.events);
              localStorage.setItem("history", JSON.stringify(history));
            }
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  //Daynamically add the past city on the search history
  function addToHistory(city) {
    const container = document.getElementById("historyContainer");
    const historyButton = document.createElement("button");
    historyButton.classList.add("historyBtn");
    historyButton.innerHTML = city;
    container.appendChild(historyButton);
  }

  function renderSavedHistoryBtns() {
    var savedHistory = localStorage.getItem("history");
    savedHistory = JSON.parse(savedHistory);
    if (savedHistory !== null) {
      for (let i = 0; i < savedHistory.length; i++) {
        addToHistory(savedHistory[i].name);
      }
    }
  }

  $(".historyBtn").on("click", historyClick);
  function historyClick(event) {
    var savedHistory = localStorage.getItem("history");
    savedHistory = JSON.parse(savedHistory);
    for (let i = 0; i < savedHistory.length; i++) {
      if (event.target.textContent === savedHistory[i].name) {
        renderWeather(savedHistory[i]);
      }
    }
  }
});

// Initialize and add the map
// function initMap() {
//   // The location of Los Angele
//   const losAngeles = { lat: 34.052235, lng: -118.243683 };
//   // The map, centered at Los Angeles
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 10,
//     center: losAngeles,
//   });
//   // The marker, positioned at Los Angeles
//   const marker = new google.maps.Marker({
//     position: losAngeles,
//     map: map,
//   });
// }

<<<<<<< HEAD
// var latlng = [];
// var latitude = 0;
// var longitude = 0;

// let map;

// // function to create a google map
// function initMap() {
//     latlng = new google.maps.LatLng(latitude, longitude);
//     infowindow = new google.maps.InfoWindow(location);
//     // The map, centered at latlng
//     map = new google.maps.Map(document.getElementById('map'), {zoom: 5, center: latlng});
//     // The marker, positioned at latlng
//     marker = new google.maps.Marker({position: latlng, map: map});
// }    

// console.log(location)
// window.initMap = initMap;
=======
var latlng = [];
var latitude = 0;
var longitude = 0;

let map;

// function to create a google map
function initMap() {
  latlng = new google.maps.LatLng(latitude, longitude);
  infowindow = new google.maps.InfoWindow(location);
  // The map, centered at latlng
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: latlng,
  });
  // The marker, positioned at latlng
  marker = new google.maps.Marker({ position: latlng, map: map });
}

console.log(location);
window.initMap = initMap;
>>>>>>> e4b0e734b43b0da09acdecd08ade45b049b65afa
