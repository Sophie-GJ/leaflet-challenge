// define url
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// create map
let myMap = L.map("map", {
    center: [34.05, -118.24],
    zoom:4
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

function chooseColor(depth) {
    if (depth < 10) return "yellow";
    else if (depth <30) return "orange";
    else if (depth < 50) return "pink";
    else if (depth <70) return "red";
    else if (depth < 90) return "darkred";
    else return "purple";
}

function chooseSize(magnitude) {
    if (magnitude < 0.5) return 2;
    else if (magnitude <1.01) return 4;
    else if (magnitude < 2.51) return 6;
    else if (magnitude <4.51) return 10;
    else return 15;
}

d3.json(url).then(function(data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                color: "none",
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.5,
                radius: chooseSize(feature.properties.mag)
            });
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + "Magnitude: " + feature.properties.mag + "</h3> <hr> <h4>" + "Depth: " + feature.geometry.coordinates[2] + "</h4> <hr> <body>" + "Lat and Long: " + feature.geometry.coordinates[0] + " , " + feature.geometry.coordinates[1] + "</body>" )
        }

    }).addTo(myMap);
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'legend');
        const depths = [-10, 10, 30, 50, 70, 90];
    
        for (let i = 0; i < depths.length - 1; i++) {
            const color = chooseColor(depths[i]);
            const label = i === 0 ? 'Depth < ' + depths[i + 1] : depths[i] + ' - ' + depths[i + 1];

            const swatch = L.DomUtil.create('div', 'swatch');
            swatch.style.backgroundColor = color;

            div.appendChild(swatch);
            div.innerHTML += label + '<br>';
    }

        return div;
};

legend.addTo(myMap);
});