import { createRef } from "react";

import React from "react";

function Meteo() {
  const [meteoData, setMeteoData] = React.useState({});

  React.useEffect(() => {
    const fetchMeteo = async () => {
      const requestData = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=chisinau&appid=60863f88c34e274c330b04f9cdd90e7d&units=metric"
      );
      const responseData = await requestData.json();

      console.log("->", responseData);
      setMeteoData(responseData);
    };
    fetchMeteo();
  }, []);

  function cityName(e) {
    console.log(e.target.value);
  }

  // console.log('***',meteoData.main.temp);

  return (
    <form>
      <label>Insert your city </label>
      <input onChange={cityName}></input>
     <div><button>Show</button></div> 
      {
        <div>
          Temp: {JSON.stringify(meteoData)} ℃
        </div> 
      }
    
    </form>
  );
}
export default Meteo;
