$(document).ready(function () {
  const city = "Irvine";
  const searchBtn = $("#searchBtn");
  var timeclass = $('.time');
  const genreId = "rock";

  //add event handler for search button click
  searchBtn.on("click", pullBands);
  pullBands();
  //render available options from api, hover over options display detail card
  function pullBands(res) {
    //TODO - findout correct format for genreId param and startDateTime param -
    fetch(
      //TODO: validate options before fetching
      `https://app.ticketmaster.com/discovery/v2/events.json?city=${city.val()}&startDateTime=${date.val()}:00Z&radius=100&apikey=UrzgZnCWVNTGuF7NQOaiNiHxt2Kjh8AI`
    )
      .then((res) => res.json())
      .then((res) => {
        renderBands(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  // this will display our results in our card
  function renderBands(bandsData) {
    console.log(bandsData, "<----- bands data");
    //TODO - after getting the bands data, work on code below
    // const city = bandsData.city;
    // const bands = bandsData.bands;
    // document.getElementById("band").textContent = bandsData.events.name;
    // document.getElementById("placeholder").innerHTML = "";
    // document.getElementById("city").textContent =
    //   bandsData.events.venues.city.name;
    // document.getElementById("datetime").textContent =
    //   bandsData.events.dates.start.dateTime;
    // console.log(band, city, datetime);
  }
});
