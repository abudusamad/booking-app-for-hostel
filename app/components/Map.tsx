"use client";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
});

interface MapProps {
	center?: number[];
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map = ({ center }: MapProps) => {
	const [location, setLocation] = useState<[number, number] | null>(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setLocation([position.coords.latitude, position.coords.longitude]);
		});
	}, []);

	return location ? (
		<MapContainer
			center={(location as L.LatLngExpression) || [51, -0.09]}
			zoom={13}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer url={url} attribution={attribution} />
			<Marker position={location as L.LatLngExpression} />
		</MapContainer>
	) : (
		<MapContainer
			center={(center as L.LatLngExpression) || [51, -0.09]}
			zoom={center ? 4 : 2}
			scrollWheelZoom={false}
			className="h-[35vh] rounded-lg"
		>
			<TileLayer url={url} attribution={attribution} />
			{center && <Marker position={center as L.LatLngExpression} />}
		</MapContainer>
	);
};

export default Map;
