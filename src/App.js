import "./App.css";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";


const url = 'http://localhost:5000/'
function App() {
  const [locations, setLocations] = useState([]);
  const [inputLoc, setInputloc] = useState("");

  const addLocation = async () => {
    await axios.post(url + "cor", {
        inputLoc
      })
      .then((response) => {
        let obj = {
          address: inputLoc,
          lat: response.data.latitude,
          long: response.data.longitude,
        };
        setLocations((locations) => [...locations, obj]);
      });
  };

  return (
    <div className="App">
      <div className="inputBlock">
        <input
          type="text"
          required
          onChange={(e) => setInputloc(e.target.value)}
          placeholder="Enter Address"
        />
        <button className="addloc" onClick={addLocation}>
          Add Location
        </button>
      </div>
      <div className="map">
      <MapContainer center={[51.505, -0.09]} zoom={4}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, key) => {
        return (
          <Marker key = {key} position={[loc.lat, loc.long]}>
            <Popup>{loc.address}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
      </div>
    </div>
  );
}

export default App;
