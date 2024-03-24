// Create variables
var legend = L.control({position: "bottomright"});

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var myMap = L.map("map", {
    center: [37.09, -100],
    zoom: 6
});


// Add tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Retrieve and map the earthquake data
d3.json(url).then(function(data) {
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: mapColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: mapRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
        }
        // Establish colors for depth
        function mapColor(depth) {
            switch(true) {
                case depth > 90:
                    return "pink";
                case depth > 70:
                    return "orange";
                case depth > 50:
                    return "yellow";
                case depth > 30:
                    return "green";
                case depth > 10:
                    return "blue"
                case depth = 10:
                    return "purple";
                case depth < 10:
                    return "purple";
                default:
                    return "black;"
            }
        }
        // Establidh magnitude size
        function mapRadius(mag) {
            if (mag === 0) {
                return 1;
            }

            return mag * 4;
        } 
        // Add earthquake data to the map
        L.geoJson(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: mapStyle,

            // Activate pop-up data on click
            onEachFeature: function(feature, layer) {
                layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
            }
        }).addTo(myMap);

        //INCOMPLETE but staying that way.
        // ran out of time.
