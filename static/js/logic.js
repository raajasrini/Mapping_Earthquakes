console.log("working ...");

// Creating map object
var earthquake_link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
var tectonic_link = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

function markerSize(magnitude){
  return magnitude * 3;
}

var earthquakes = new L.LayerGroup();

d3.json(earthquake_link, function(data){
  L.geoJson(data.features, {
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "</h3>");
    },
    pointToLayer: function(feature, latlng) {
      return new L.circleMarker(latlng, 
        {radius: markerSize(feature.properties.mag)});
      },
        style: function(gF){
          return {
        fillColor: markerColor(gF.properties.mag),
        fillOpacity: .6,
        color: "white",
        stroke: true,
        weight: .8
    }}
  }).addTo(earthquakes);  
});

var tectonicPlates = new L.LayerGroup();
// Adding tile layer

d3.json(tectonic_link, function(geoJson){
  L.geoJson(geoJson.features, {
    style: function(gF){
      return{
    color: "yellow",
    weight: 2
      }
    },
  }).addTo(tectonicPlates);
});


function markerColor(magnitude){
  if (magnitude > 5){
    return "red"
  }
  else if (magnitude > 4) {
    return "orange"
  }
  else if (magnitude > 3){
    return "#FFD700"
  }
  else if (magnitude > 2){
    return "yellow"
  }
  else if (magnitude > 1){
    return "green"
  }
  else { return "#90EE90"}
};

function createMap(){
var streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: "pk.eyJ1IjoibWFkaHUtciIsImEiOiJjanA1aXd2cGEwOG8zM2twbnNxZ2ZnOWMzIn0.EpYYgZ6vgbmFf-vtY9xeig"

});

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: "pk.eyJ1IjoibWFkaHUtciIsImEiOiJjanA1aXd2cGEwOG8zM2twbnNxZ2ZnOWMzIn0.EpYYgZ6vgbmFf-vtY9xeig"
});

var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: "pk.eyJ1IjoibWFkaHUtciIsImEiOiJjanA1aXd2cGEwOG8zM2twbnNxZ2ZnOWMzIn0.EpYYgZ6vgbmFf-vtY9xeig"
});


var baseMaps = {
  "Dark Map":darkMap,
  "Street Map": streetMap,
  "Satellite": satellite
};

var overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

var map = L.map("map", {
  center: [61.4406, -149.8866],
  zoom: 3,
  layers: [satellite, earthquakes]
});

L.control.layers(baseMaps, overlayMaps).addTo(map);
var legend = L.control({
  position: "bottomright"
});

legend.onAdd = function(map){
  var div = L.DomUtil.create("div", "info legend"),
  grades = [0, 1, 2, 3, 4, 5],
  labels = [];

 div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

// loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(map);
}

createMap();

