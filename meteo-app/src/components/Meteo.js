import React from "react";

function Meteo() {
  const [meteoData, setMeteoData] = React.useState({});
  const [query, setQuery] = React.useState("chisinau");
  const [inputData, setInputData] = React.useState("");

  React.useEffect(() => {
    const fetchMeteo = async () => {
      const requestData = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=60863f88c34e274c330b04f9cdd90e7d&units=metric`
      );
      const responseData = await requestData.json();
      console.log("->", responseData);
      setMeteoData(responseData);
    };
    fetchMeteo();
  }, [query]);

  function cityName(e) {
    console.log(e.target.value);
    setInputData(e.target.value);
  }

  return (
    <div>
      <label>Insert your city </label>
      <input onChange={cityName}></input>
      <div>
        <button
          onClick={(e) => {
            setQuery(inputData);
          }}
        >
          Show
        </button>
      </div>
      {Object.keys(meteoData).length === 0 ? (
        <h1>Loading...</h1>
      ) : meteoData.cod === "404" || meteoData.cod === "400" ? (
        <h1>{meteoData.message}...</h1>
      ) : (
        <div>
          <div>
            Country: {JSON.stringify(meteoData.sys.country)} ,
            {JSON.stringify(meteoData.name)}
          </div>
          <div> Temperature: {JSON.stringify(meteoData.main.temp)} ℃</div>
        </div>
      )}
    </div>
  );
}
export default Meteo;
