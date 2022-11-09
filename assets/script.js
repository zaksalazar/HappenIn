$(document).ready(function () {
  const cityEl = $("#cityInput"); 
  const dateEl = $("#dateInput")
  //const radius = $("#radius");
  const genreEl = $("#genreInput")
  const searchBtnEl = $("#searchBtn");

  //add event handler for search button click
  searchBtnEl.on("click", resultsPage);


  function resultsPage() {
  
    var city = cityEl.val()
    var date = dateEl.val()
    var genre = genreEl.val()

    console.log(city)
    console.log(date)
    console.log(genre)

    var url = window.location.href
    console.log(url)

    var tempUrl = url.split("index.html")
    newUrl = tempUrl[0] + "/Results/results.html"
    console.log(newUrl)

    
    var params = new URLSearchParams({ city: `${city}`, date: `${date}`, genre: `${genre}`})
    var query = params.toString();
    console.log(query)
    var newUrl = newUrl + '?' +query
    console.log(newUrl)

    window.location = newUrl

  }


  //render available options from api, hover over options display detail card
  // function pullBands(res) {
  //   fetch(
  //     `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&${date}&${radius}&${genreId}apikey=UrzgZnCWVNTGuF7NQOaiNiHxt2Kjh8AI`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {});
  //   renderBands(res);
  // }
  // // this will display our results in our card
  // function renderBands(bandsData) {
  //   const city = bandsData.city;
  //   const bands = bandsData.bands;
  //   document.getElementById("band").textContent = bandsData.events.name;
  //   document.getElementById("placeholder").innerHTML = "";
  //   document.getElementById("city").textContent = bandsData.events.venues.city.name;
  //   document.getElementById("datetime").textContent =bandsData.events.dates.start.dateTime;
  //   console.log(band, city, datetime);
  // }
});



