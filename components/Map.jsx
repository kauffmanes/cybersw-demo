import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = () => {
  return (
    <MapContainer
      center={[34, -103.5]}
      zoom={13}
      maxZoom={15}
      minZoom={5}
      scrollWheelZoom={false}
      style={{ height: 400, width: "100%" }}
      preferCanvas={true}
      attributionControl={false}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  )
}

export default Map