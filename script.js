let map = null;
const generateMap = (geojson, home) => {
  map = L.map('leaflet-map').setView(home, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.geoJSON(geojson).addTo(map);
  setTimeout(() => {
    map.invalidateSize()
  }, 3000)
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
  let home = JSON.parse(JSON.stringify(coordinate[0])).reverse();
  document.querySelector('#map-area').innerHTML =
    '<div id="leaflet-map"></div>';
  generateMap(geojson, home);
});
