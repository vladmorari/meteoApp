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
      setMeteoData(requestData);
    };
    fetchMeteo();
  }, [buttonState]);

  return (
    <form>
      <label>Insert your city</label>
      <div>{JSON.stringify(meteoData)}</div>
      <button>Show</button>
    </form>
  );
}
export default Meteo;
