createMap()
/*****************Tools*****************/ 

//Get user location
async function getCoords() {
  pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return [pos.coords.latitude, pos.coords.longitude];
}

//Creates the map
async function createMap() {
  const coords = await getCoords();

  if (coords) {
    const map = L.map("map").setView(coords, 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker(coords);
    marker.addTo(map).bindPopup("<p1><b>You are here!</b></p1>").openPopup();
  }
}

//Drop Down Selector Value
const businessFinder = document.getElementById("drop-down");

businessFinder.addEventListener("change", async (event) => {
  const selection = event.target.value;

  const places = await renderMap(selection)

});
/*****************End of Tool*****************/ 

/*****************Make Map*****************/ 
async function renderMap(query) { //uses drop down selector
        const searchParams = new URLSearchParams({ //search parameters for fetch URL
          query: query,
          ll: '36.2807296,-115.1533056',
          open_now: 'true',
          sort: 'DISTANCE'
        });
        const results = await fetch( //fetch using Foursquare API
          `https://api.foursquare.com/v3/places/search?${searchParams}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'fsq3EEmTTaTRhDkkKGK0ElAGKCjxoksHvZKClqGPOjdQvN4=',
            }
          }
        );
        const data = await results.json(); //Array of business locations
        
        console.log(data)

        for (let i = 0; i < 5 && data.results.length; i++){
            const place = data.results[i];
            console.log(`Location: ${i+1}`)
            console.log(place.geocodes.main.latitude);
            console.log(place.geocodes.main.longitude);
        }

        //console.log(data.results[2].geocodes.main.latitude)
        //console.log(data.results[2].geocodes.main.longitude)

        createMap()
}
/*****************End of Make Map*****************/