import React from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

export default function CityMap(props) {
    if (!props.city) return <div></div>;

    function boundsConvert(b) {
        return [b.northeast, b.southwest];
    }

    const {lat, lng, ...rest} = props.city;

    const mapParams = {
        zoom: 13,
        style: {width: '100%', height: 800},
        center: {lat, lng},
    };
    if (props.city.bounds) {
        mapParams.bounds = boundsConvert(props.city.bounds)
    }
    return <Map  {...mapParams}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={mapParams.center}>
            <Popup>A pretty CSS3 popup.<br/>Easily customizable.</Popup>
        </Marker>
    </Map>

}
