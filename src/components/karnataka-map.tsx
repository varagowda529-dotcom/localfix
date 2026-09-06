"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type DistrictData = {
  name: string;
  slug: string;
  count: number;
};

/** Approximate real centers of Karnataka districts */
const DISTRICT_COORDS: Record<string, [number, number]> = {
  bidar: [17.9133, 77.5301],
  kalaburagi: [17.3297, 76.8343],
  yadgir: [16.7700, 77.1376],
  vijayapura: [16.8302, 75.7100],
  bagalkote: [16.1867, 75.6961],
  raichur: [16.2076, 77.3463],
  koppal: [15.3452, 76.1548],
  ballari: [15.1394, 76.9214],
  vijayanagara: [15.3350, 76.4600],
  belagavi: [15.8497, 74.4977],
  dharwad: [15.4589, 75.0078],
  gadag: [15.4315, 75.6350],
  haveri: [14.7937, 75.4045],
  "uttara-kannada": [14.8185, 74.1330],
  shivamogga: [13.9299, 75.5681],
  davanagere: [14.4644, 75.9218],
  chitradurga: [14.2306, 76.3980],
  tumakuru: [13.3409, 77.1010],
  chikkaballapur: [13.4355, 77.7315],
  kolar: [13.1367, 78.1290],
  "bengaluru-urban": [12.9716, 77.5946],
  "bengaluru-rural": [13.2846, 77.3920],
  ramanagara: [12.7200, 77.2800],
  mandya: [12.5218, 76.8951],
  hassan: [13.0033, 76.1004],
  mysuru: [12.2958, 76.6394],
  chamarajanagar: [11.9261, 76.9437],
  kodagu: [12.3375, 75.8069],
  udupi: [13.3409, 74.7421],
  "dakshina-kannada": [12.9141, 74.8560],
  chikkamagaluru: [13.3161, 75.7720],
};

function FitKarnataka() {
  const map = useMap();
  useEffect(() => {
    map.setView([14.5, 76.0], 7);
  }, [map]);
  return null;
}

function getColor(count: number) {
  if (count === 0) return "#94a3b8"; // slate
  if (count < 2) return "#5eead4"; // teal-300
  if (count < 4) return "#14b8a6"; // teal-500
  if (count < 8) return "#0d9488"; // teal-600
  return "#115e59"; // teal-800
}

function getRadius(count: number) {
  if (count === 0) return 10;
  if (count < 2) return 14;
  if (count < 4) return 18;
  if (count < 8) return 22;
  return 28;
}

export default function KarnatakaMap({
  districts,
}: {
  districts: DistrictData[];
}) {
  const router = useRouter();

  return (
    <div className="relative h-[620px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <MapContainer
        center={[14.5, 76.0]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full bg-slate-100"
      >
        <FitKarnataka />

        {/* Clean light basemap */}
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {districts.map((d) => {
          const coords = DISTRICT_COORDS[d.slug];
          if (!coords) return null;

          const color = getColor(d.count);
          const radius = getRadius(d.count);

          return (
            <CircleMarker
              key={d.slug}
              center={coords}
              radius={radius}
              pathOptions={{
                color: "#fff",
                weight: 2,
                fillColor: color,
                fillOpacity: 0.9,
              }}
              eventHandlers={{
                click: () => router.push(`/locations/${d.slug}`),
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div className="text-center">
                  <div className="font-bold text-slate-800">{d.name}</div>
                  <div className="text-xs text-slate-500">
                    {d.count} problem{d.count === 1 ? "" : "s"}
                  </div>
                  <div className="text-[10px] text-teal-700">Click to explore</div>
                </div>
              </Tooltip>

              <Popup>
                <div className="min-w-[140px]">
                  <p className="font-bold text-slate-900">{d.name}</p>
                  <p className="text-xs text-slate-500 mb-2">
                    {d.count} reported problem{d.count === 1 ? "" : "s"}
                  </p>
                  <button
                    onClick={() => router.push(`/locations/${d.slug}`)}
                    className="w-full rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-700"
                  >
                    View Taluks →
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Floating legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-[11px] shadow-md backdrop-blur">
        <p className="mb-1.5 font-bold uppercase tracking-wide text-slate-400">
          Problems
        </p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> 0
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-300" /> 1–3
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-600" /> 4+
          </span>
        </div>
      </div>
    </div>
  );
}