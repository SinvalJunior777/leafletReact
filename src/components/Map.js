import styled from 'styled-components';
import { useState } from "react";
import L from "leaflet"

import { MapContainer,LayersControl,TileLayer,Popup,useMapEvents,Marker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
// Style React Leaflet's MapContainer to take 100% of the page's size
var morgana = L.icon({
    iconUrl:  require('./morgana.png'),
   

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
function LocationMarker() {
    const [position, setPosition] =useState(null);
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, 13)
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={morgana} >
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  
const MapWrapper = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
`;

// Define initial bounds

const initBounds = [
  [42.5993718217880613, 1.5937492475355806],
  [45.9312500000000341, 7.6656250000000341]
];
const Map = () => {
  return (
    <MapWrapper
      bounds={initBounds}
      zoom={8}
      scrollWheelZoom={true}>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    />
    <LocationMarker />
    </MapWrapper>
    
  );
};
export default Map;