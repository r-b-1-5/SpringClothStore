import { RefreshOutline } from "@graywolfai/react-heroicons";
import L from "leaflet";
import iconPng from "leaflet/dist/images/marker-icon.png";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { usePosition } from "use-position";
import SETTINGS from "../settings";

const fixedIcon = L.icon({
  iconUrl: iconPng,
});

var greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  // iconSize: [25, 41],
});

async function fetchNearbyDropOffPoints(
  sourceLat = 80,
  sourceLon = 80,
  setNearbyDropOffPoints
) {
  const nearbyDropOffPointsRaw = await fetch(
    `${SETTINGS.BASE_URL}/drop-off-points?sourceLatitude=${sourceLat}&sourceLongitude=${sourceLon}`
  );
  const nearbyDropOffPoints = await nearbyDropOffPointsRaw.json();

  setNearbyDropOffPoints(nearbyDropOffPoints);
}

function DropOffPointPopupCard(props) {
  return (
    <div>
      <div>
        {props.address}, {props.city}, {props.state}, {props.country},{" "}
        {props.zipCode}
      </div>
      <br />
      <div>
        Give a call at{" "}
        <span className="border-b border-blue-600 font-bold">
          {props.contact}
        </span>
      </div>
    </div>
  );
}

function DropOff() {
  const { latitude, longitude } = usePosition();
  const [nearbyDropOffPoints, setNearbyDropOffPoints] = useState([]);

  useEffect(() => {
    if (latitude && longitude)
      fetchNearbyDropOffPoints(latitude, longitude, setNearbyDropOffPoints);
  }, [latitude, longitude]);

  if (
    !latitude ||
    !longitude ||
    !nearbyDropOffPoints ||
    nearbyDropOffPoints.length === 0
  ) {
    return (
      <div>
        <div className="flex justify-center">
          <div className="font-thin text-2xl">Loading</div>
        </div>
        <div className="flex justify-center">
          <div>
            <RefreshOutline className="-animate-spin h-20 w-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={greenIcon}>
          <Popup>
            <div className="italic">You are here.</div>
          </Popup>
        </Marker>
        {nearbyDropOffPoints.map((p, idx) => (
          <Marker
            key={idx}
            position={[p.latitude, p.longitude]}
            icon={fixedIcon}
          >
            <Popup>
              <DropOffPointPopupCard {...p} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="flex-grow-1 p-2 text-sm">
        <div className="text-lg">Hello!</div>
        <div>At Flopkart, we believe in giving our best to our customers.</div>
        <div>
          If you are presently in a{" "}
          <span className="font-semibold text-red-600">COVID red zone</span>,
          then our delivery services may not be able to deliver directly to your
          home.
        </div>
        <div>
          We have established several{" "}
          <span className="font-semibold text-green-700">
            drop-off/pick-up locations
          </span>{" "}
          at the boundary of these zones. If you are in a red zone, then your
          delivery will be dropped off at the nearest drop-off location, and you
          may collect your delivery from the same. You will remain notified of
          all such developments throughout the delivery process.
        </div>
        <div className="rounded-md bg-green-400 p-1 font-semibold mt-4">
          You can use the map above to find a drop-off location near you.
        </div>
      </div>
    </div>
  );
}

export default DropOff;
