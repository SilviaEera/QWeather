import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faTemperatureFull } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
const api_key = "9cce656fbdcd17f5f30dc28c379d780f";
function App() {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);

  const weathers = [
    {
      type: "Clear",
      img: "./src/assets/cloudy-day.png",
    },
    {
      type: "Rainy",
      img: "./src/assets/rainy.png",
    },
    {
      type: "Clouds",
      img: "./src/assets/cloudy-day.png",
    },
    {
      type: "Haze",
      img: "./src/assets/haze.png",
    },
    {
      type: "Thunder",
      img: "./src/assets/thunder.png",
    },
    {
      type: "Mist",
      img: "./src/assets/mist.png",
    },
    {
      type: "Snow",
      img: "./src/assets/snow.png",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&appid=${api_key}`;

    // console.log(inputRef.current.value);

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setShowWeather(
          weathers.filter((weather) => weather.type === data.weather[0].main)
        );
        setApiData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-gray-800 grid h-screen  place-items-center">
        <div className="bg-white w-72 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <input
              type="text"
              ref={inputRef}
              id=""
              placeholder="Enter City Name"
              className="border-b border-gray-200 focus:outline-none text-xl p-2 w-32 flex-1"
            />
            <button onClick={fetchWeather}>
              <FontAwesomeIcon
                icon={faSun}
                className="text-xl text-gray-400  hover:text-gray-600"
              />
            </button>
          </div>
          {/* icon start */}
          <div>
            {showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                <p className="cityName text-center font-medium text-xl text-gray-400">
                  {" "}
                  Oslo, Norway
                </p>
                <img src={weathers[1].img} className="w-28 mx-auto" alt="" />
                <h3 className="text-xl font-medium text-gray-400">
                  {weathers[1].type}
                </h3>
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faTemperatureFull}
                    className="text-2xl mr-2"
                  />
                  <h2 className="ml-2 font-extrabold text-3xl">30&#176;C</h2>
                  {/* <p className="font-thin">{apiData.weather[0].description}</p> */}
                </div>
              </div>
            )}
          </div>
          {/* icon end */}
        </div>
      </div>
    </>
  );
}

export default App;
