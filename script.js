import * as geoJsonArea from './lib/geoarea.js';
document.querySelector(
  '#coordinate'
).placeholder = `add co-ordinate ex:- ["78.34446558199403,17.935920114192413","78.34444166541078,17.935920114192413","78.34436513234448,17.93560155407353","78.34426468269606,17.935242035537343","78.34474062269936,17.935000839147804","78.34490564712297,17.93569257130916","78.34446558199403,17.935920114192413"]`;
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
