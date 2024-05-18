import React, { useEffect, useRef, useState } from "react";
import ReactMapGl, { GeolocateControl, Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { locationType } from "../../pages/tradesman/register";
type markerLocation = {
    latitude: number;
    longitude: number;
};
type mapLocation = markerLocation & {
    zoom: number;
};
const MapComponent = ({
    latitude,
    longitude,
    setLocation,
}: markerLocation & {
    setLocation: React.Dispatch<React.SetStateAction<locationType>>;
}) => {
    const [viewport, setViewport] = useState<mapLocation>({
        latitude,
        longitude,
        zoom: 16,
    });
    const [marker, setMarker] = useState<markerLocation>({
        latitude,
        longitude,
    });

    useEffect(() => {
        setViewport((v) => ({
            ...v,
            latitude,
            longitude,
            zoom: 16,
        }));
    }, [latitude, longitude]);

    const handleMarkerDrag = (event) => {
        const latitude = event.lngLat.lat;
        const longitude = event.lngLat.lng;
        setMarker({ latitude, longitude });
        setLocation((l)=>({...latitude,latitude,longitude}))
    };

    return (
        <div className="map bg-red-800 h-[400px] w-full">
            <Map
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                initialViewState={viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    draggable={true}
                    onDragEnd={handleMarkerDrag}
                />
            </Map>
        </div>
    );
};

export default MapComponent;
