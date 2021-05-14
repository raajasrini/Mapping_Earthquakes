# Mapping_Earthquakes


## Project Overview

The objective of this project is to gather earthquake GeoJSON data from the USGS API, create and explore interactive maps of earthquakes around the world.
The earthquake data is represented on the maps in relation to the tectonic plates’ location on the earth, and according to each event's magnitude.

## Results 
To interact with the maps API the user have to visit mapbox.com, create a Mapbox account and retrieve the access token. The index.html calls for the Mapbox API key in the config.js file.

To open the index.html file, open the command line, navigate to the main folder and on the command line, enter python -m http.server.

1: Add Tectonic Plate Data

![Tectonic Plate Data - Street View](https://github.com/raajasrini/Mapping_Earthquakes/blob/main/images/d1.png)
![Tectonic Plate Data - Street View](https://github.com/raajasrini/Mapping_Earthquakes/blob/main/images/d2.png)

2: Add Major Earthquake Data
![Major Earthquake Data - Street View](https://github.com/raajasrini/Mapping_Earthquakes/blob/main/images/d3.png)

3: Add an Additional Map
![Additional Dark Map View](https://github.com/raajasrini/Mapping_Earthquakes/blob/main/images/d4.png)

## Resources
* Data Source: Earthquakes GeoJSON, Earthquakes above 4.5mag GeoJSON, Tectonic Plate GeoJSON

* Software: HTML/CSS, JavaScript, Visual Studio Code 1.49.1, Leaflet 1.7.1, D3.js 6.2.0