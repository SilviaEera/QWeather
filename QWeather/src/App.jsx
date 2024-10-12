import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faTemperatureFull } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const api_key = "9cce656fbdcd17f5f30dc28c379d780f";

function App() {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const weathers = [
    { type: "Clear", img: "./src/assets/cloudy-day.png" },
    { type: "Rain", img: "./src/assets/rainy.png" },
    { type: "Clouds", img: "./src/assets/cloudy-day.png" },
    { type: "Haze", img: "./src/assets/haze.png" },
    { type: "Thunderstorm", img: "./src/assets/thunder.png" },
    { type: "Mist", img: "./src/assets/mist.png" },
    { type: "Snow", img: "./src/assets/snow.png" },
  ];

  const fetchWeather = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
      const res = await fetch(URL);
      const data = await res.json();

      if (res.ok) {
        setShowWeather(
          weathers.filter((weather) => weather.type === data.weather[0].main)
        );
        setApiData(data);
        setErrorMessage("");
      } else {
        setApiData(null);
        setShowWeather(null);
        setErrorMessage("City not found. Please try again."); // Set error message
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchWeather("Kyoto");
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather(inputRef.current.value);
    }
  };

  return (
    <>
      <div className="bg-gray-800 grid h-screen place-items-center">
        <div className="bg-white w-72 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <input
              type="text"
              ref={inputRef}
              onKeyPress={handleKeyPress}
              placeholder="Enter City Name"
              className="border-b border-gray-200 focus:outline-none text-xl p-2 w-32 flex-1"
            />
            <button onClick={() => fetchWeather(inputRef.current.value)}>
              <FontAwesomeIcon
                icon={faSun}
                className="text-xl text-gray-400 hover:text-gray-600"
              />
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}

          {showWeather && apiData && (
            <div className="text-center flex flex-col gap-6 mt-10">
              <p className="cityName text-center font-medium text-xl text-gray-400">
                {apiData.name}, {apiData.sys.country}
              </p>
              <img
                src={showWeather[0]?.img}
                className="w-28 mx-auto"
                alt={showWeather[0]?.type}
              />
              <h3 className="text-xl font-medium text-gray-400">
                {showWeather[0]?.type}
              </h3>
              <div className="flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faTemperatureFull}
                  className="text-2xl mr-2 text-gray-600"
                />
                <h2 className="ml-2 font-extrabold text-3xl text-gray-400">
                  {(apiData.main.temp - 273.15).toFixed(1)}&#176;C
                  <br />
                  {(((apiData.main.temp - 273.15) * 9) / 5 + 32).toFixed(1)}
                  &#176;F
                </h2>
              </div>

              <p className="font-bold text-xl text-gray-400">
                Wind Speed: {(apiData.wind.speed * 3.6).toFixed(2)} km/h
              </p>
              <p className="font-bold text-xl text-gray-400">
                Humidity: {apiData.main.humidity}&#37;
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
