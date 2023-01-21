import "./App.css";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const url = "http://localhost:5000/";
function App() {
  const [locations, setLocations] = useState([]);
  const [inputLocOne, setInputLocOne] = useState("");
  const [inputLocTwo, setInputLocTwo] = useState("");


  const addLocation = async (e) => {
    e.preventDefault();
    console.log(inputLocOne,inputLocTwo)
    await axios
      .post(url + "cor", {
        inputLocOne,
        inputLocTwo
      })
      .then((response) => {
        console.log(response)
        let obj1 = {
          address: inputLocOne,
          lat: response.data.cor1.latitude,
          long: response.data.cor1.longitude,
        };
        let obj2 = {
          address: inputLocTwo,
          lat: response.data.cor2.latitude,
          long: response.data.cor2.longitude,
        };
        setLocations((locations) => [...locations, obj1,obj2]);
      });
  };

  return (
    <div className="App">
      <form className="inputBlock">
        <div className="posOne">
          <input
            type="text"
            required
            onChange={(e) => setInputLocOne(e.target.value)}
            placeholder="Choose a staring place"
          />
        </div>
        <div className="posTwo">
          <input
            type="text"
            required
            onChange={(e) => setInputLocTwo(e.target.value)}
            placeholder="Choose Destination"
          />
        </div>
        <button className="addloc" onClick={addLocation}>
          Find Path
        </button>
      </form>
      <div className="map">
        <MapContainer center={[29.505, 78.044]} zoom={4}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc, key) => {
            return (
              <Marker key={key} position={[loc.lat, loc.long]}>
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
