$(document).ready(function () {
  const city = "Irvine";
  const searchBtn = $("#searchBtn");
  const date = "2022-11-22T00:00";
  // const genreId = "rock";

  //add event handler for search button click
  searchBtn.on("click", pullBands);
  pullBands();
  //render available options from api, hover over options display detail card
  function pullBands(res) {
    //TODO - findout correct format for genreId param and startDateTime param -
    //TODO: validate options before fetching
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&startDateTime=${date}:00Z&radius=100&apikey=UrzgZnCWVNTGuF7NQOaiNiHxt2Kjh8AI`
    )
      .then((res) => res.json())
      .then((bandData) => {
        renderBands(bandData);
        function renderBands(bandData) {
          console.log(bandData)
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
});
