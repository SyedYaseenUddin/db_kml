import * as geoJsonArea from './lib/geoarea.js';
let map = null;
const generateMap = (geojson, home) => {
  map = L.map('map').setView(home, 18);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.geoJSON(geojson).addTo(map);
  setTimeout(() => {
    map.invalidateSize();
  });
};

const generateGeojson = (coor) => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coor],
        },
        properties: {},
      },
    ],
  };
};

document.querySelector('#submitBtn').addEventListener('click', () => {
  let coordinate = document.querySelector('#coordinate').value;
  coordinate = JSON.parse(coordinate).map((d) => d.split(',').map((d) => +d));
  const geojson = generateGeojson(coordinate);
  debugger;
  let measured_area = geoJsonArea.geometry(geojson.features[0].geometry);
  measured_area = +(measured_area / 4047).toFixed(3) + ' Acres';
  console.log();
  let home = JSON.parse(JSON.stringify(coordinate[0])).reverse();
  document.querySelector('#map-area').innerHTML = `<div class="row">
  <div class="col-12">
    <div id="map"></div>
    <h4>Total area : ${measured_area}</h4>
  </div>
</div>`;
  setTimeout(() => generateMap(geojson, home));
});
