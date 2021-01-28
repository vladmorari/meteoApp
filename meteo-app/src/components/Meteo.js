import React, { useReducer } from "react";

function Meteo() {
  // const [meteoData, setMeteoData] = React.useState({});
  // const [query, setQuery] = React.useState("chisinau");
  // const [inputData, setInputData] = React.useState("");

  const dataReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          input: action.payload.text,
        };
      case "FETCH_DATA":
        return {
          ...state,
          meteo: action.payload.text,
        };
      case "METEO_DATA":
        return {
          ...state,
          city: action.payload.text,
        };
      default:
        return state;
    }
  };
  const initialState = {
    meteo: {},
    city:"chisinau",
    input:""

  };
  const [state, dispatch] = useReducer(dataReducer, initialState);

  function cityName(e) {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { input: e.target.value },
    });
  }

  React.useEffect(() => {
    const fetchMeteo = async () => {
      const requestData = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=60863f88c34e274c330b04f9cdd90e7d&units=metric`
      );
      const responseData = await requestData.json();
      dispatch({
        type: "FETCH_DATA",
        payload: { meteo: responseData },
      });
      // setMeteoData(responseData);
    };
    fetchMeteo();
  }, [state.city]);

  return (
    <div>
      <label>Insert your city </label>
      <input onChange={cityName}></input>
      <div>
        <button
          onClick={(e) => {
            dispatch({
              type: "METEO_DATA",
              payload: { city: "chisinau" },
            });
            // setQuery(inputData);
          }}
        >
          Show
        </button>
      </div>
      {Object.keys(state.meteo).length === 0 ? (
        <h1>Loading...</h1>
      ) : state.meteo.cod === "404" || state.meteo.cod === "400" ? (
        <h1>{state.meteo.message}...</h1>
      ) : (
        <div>
          <div>
            Country: {JSON.stringify(state.meteo.sys.country)} ,
            {JSON.stringify(state.meteo.name)}
          </div>
          <div> Temperature: {JSON.stringify(state.meteo.main.temp)} ℃</div>
        </div>
      )}
    </div>
  );
}
export default Meteo;
