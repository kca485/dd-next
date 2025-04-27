"use client";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapMouseEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import Image from "next/image";
import placeholderImage from "@/public/placeholder.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Poi {
  key: string;
  location: google.maps.LatLngLiteral;
}
const pois: Poi[] = [
  { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
  { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
  { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
  { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
  { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
  { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
  { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
  { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
  { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
  { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
  { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
  { key: "kingStreetWharf", location: { lat: -33.8665445, lng: 151.1989808 } },
  { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
  { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
  { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
];

export function GoogleMap() {
  const [newPosition, setNewPosition] = useState<{
    lat: number;
    lng: number;
  }>();

  function handlePlaceMarker(e: MapMouseEvent) {
    console.log(e.detail.latLng);
  }
  return (
    <>
      <TooltipProvider>
        <APIProvider
          apiKey="AIzaSyCznevvPmQwRnUjam5bcXrwZWHNsHOV4iY"
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            mapId="43ca1adc30ca2b5a"
            onCameraChanged={(e: MapCameraChangedEvent) =>
              console.log(
                "camera changed:",
                e.detail.center,
                "zoom:",
                e.detail.zoom,
              )
            }
            onClick={handlePlaceMarker}
          >
            <PoiMarkers />
          </Map>
        </APIProvider>
      </TooltipProvider>
    </>
  );
}

function PoiMarkers() {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  function setMarkerRef(marker: Marker | null, key: string) {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  }

  const handleMarkerClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!e.latLng) return;
      console.log(e.latLng.toJSON());
      map.panTo(e.latLng);
    },
    [map],
  );

  return pois.map((poi) => (
    <AdvancedMarker
      key={poi.key}
      position={poi.location}
      ref={(marker) => setMarkerRef(marker, poi.key)}
      clickable={true}
      onClick={handleMarkerClick}
    >
      <Tooltip>
        <TooltipContent>
          <Image
            src={placeholderImage}
            alt={poi.key}
            height={100}
            width={100}
            className="bg-white"
          />
        </TooltipContent>
        <TooltipTrigger>
          <span className="bg-white p-2 rounded-full border">{poi.key}</span>
        </TooltipTrigger>
      </Tooltip>
    </AdvancedMarker>
  ));
}
