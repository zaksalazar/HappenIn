$(document).ready(function () {
  const city = $("#city").value;
  const searchBtn = $("#placeholder");
  const date = $("#date").value;
  const radius = $("#radius");
  const genreId = $("#genreSearch").value;

  //add event handler for search button click
  $("#submitButton").on("click", pullBands());

  //render available options from api, hover over options display detail card
  function pullBands(res) {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&${date}&${radius}&${genreId}apikey=UrzgZnCWVNTGuF7NQOaiNiHxt2Kjh8AI`
    )
      .then((res) => res.json())
      .then((res) => {});
    renderBands(res);
  }
  // this will display our results in our card
  function renderBands(bandsData) {
    const city = bandsData.city;
    const bands = bandsData.bands;
    document.getElementById("band").textContent = bandsData.events.name;
    document.getElementById("placeholder").innerHTML = "";
    document.getElementById("city").textContent =
      bandsData.events.venues.city.name;
    document.getElementById("datetime").textContent =
      bandsData.events.dates.start.dateTime;
    console.log(band, city, datetime);
  }
});
