"use client";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapMouseEvent,
  Pin,
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
import { Button } from "@/components/ui/button";

export interface Poi {
  id: number;
  location: google.maps.LatLngLiteral;
  price: number;
  picturePath: string;
}

interface MapProps {
  places: Poi[];
  onEditPlace(formdata: FormData, id: number): Promise<void>;
  onAddPlace(formdata: FormData): Promise<void>;
  onDeletePlace(id: number): Promise<void>;
}
export function MapWidget({
  places,
  onEditPlace,
  onAddPlace,
  onDeletePlace,
}: MapProps) {
  const pois = places;
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [newPosition, setNewPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const latLng = selectedMarker ?? newPosition;

  const handleSelectMarker = useCallback(
    (latLng: google.maps.LatLngLiteral) => {
      setNewPosition(null);
      setSelectedMarker(latLng);
    },
    [],
  );

  function handlePlaceMarker(e: MapMouseEvent) {
    setSelectedMarker(null);
    setNewPosition(e.detail.latLng);
  }

  function handleForm(formData: FormData) {
    if (selectedMarker) {
      const selectedPoi = pois.find(
        (poi) =>
          poi.location.lat === selectedMarker.lat &&
          poi.location.lng === selectedMarker.lng,
      );
      if (!selectedPoi?.id) {
        return console.error("No id to update");
      }
      onEditPlace(formData, selectedPoi.id);
      setSelectedMarker(null);
    } else {
      onAddPlace(formData);
      setNewPosition(null);
    }
  }

  function handleDelete() {
    if (!selectedMarker) {
      return console.error("No marker selected");
    }
    const selectedPoi = pois.find(
      (poi) =>
        poi.location.lat === selectedMarker.lat &&
        poi.location.lng === selectedMarker.lng,
    );
    if (!selectedPoi?.id) {
      return console.error("No id to delete");
    }
    onDeletePlace(selectedPoi.id);
  }

  return (
    <div className="flex">
      <div className="h-screen flex-grow">
        <TooltipProvider>
          <APIProvider apiKey="AIzaSyCznevvPmQwRnUjam5bcXrwZWHNsHOV4iY">
            <Map
              defaultZoom={13}
              defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
              mapId="43ca1adc30ca2b5a"
              onClick={handlePlaceMarker}
            >
              <PoiMarkers onSelect={handleSelectMarker} pois={pois} />
              {newPosition && (
                <AdvancedMarker position={newPosition}>
                  <Pin
                    background="#FBBC04"
                    glyphColor="#000"
                    borderColor="#000"
                  />
                </AdvancedMarker>
              )}
            </Map>
          </APIProvider>
        </TooltipProvider>
      </div>
      <div className="w-xs p-4 flex flex-col">
        <h1 className="font-bold text-lg pb-4">Data</h1>
        {latLng && (
          <PlaceForm latLng={latLng} onSubmit={handleForm} pois={pois} />
        )}
        {selectedMarker && (
          <form action={handleDelete}>
            <Button variant="destructive">Delete</Button>
          </form>
        )}
      </div>
    </div>
  );
}

interface PoiMarkersProps {
  onSelect: (latLng: google.maps.LatLngLiteral) => void;
  pois: Poi[];
}
function PoiMarkers({ onSelect, pois }: PoiMarkersProps) {
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
      map.panTo(e.latLng);

      onSelect?.(e.latLng.toJSON());
    },
    [map, onSelect],
  );

  return pois.map((poi) => (
    <AdvancedMarker
      key={poi.id}
      position={poi.location}
      ref={(marker) => setMarkerRef(marker, String(poi.id))}
      clickable={true}
      onClick={handleMarkerClick}
    >
      <Tooltip>
        <TooltipContent>
          <Image
            loader={poi.picturePath ? ({ src }) => src : undefined}
            src={poi.picturePath || placeholderImage}
            alt=""
            height={100}
            width={100}
            className="bg-white"
          />
        </TooltipContent>
        <TooltipTrigger>
          <span className="bg-white p-2 rounded-full border border-2 border-black">
            {formatPrice(poi.price)}
          </span>
        </TooltipTrigger>
      </Tooltip>
    </AdvancedMarker>
  ));
}

function formatPrice(number: number) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
  }).format(number);
}
