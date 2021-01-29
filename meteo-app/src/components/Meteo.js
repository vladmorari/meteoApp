import React, { useReducer } from "react";

function Meteo() {
  // const [meteoData, setMeteoData] = React.useState({});
  // const [query, setQuery] = React.useState("chisinau");
  // const [inputData, setInputData] = React.useState("");

  const dataReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT": //console.log("change  ",action.payload.input)
        return {
          ...state,
          input: action.payload.input,
        };
      case "FETCH_DATA":
        // console.log("fetch ", action.payload.meteo.main);
        return {
          ...state,
          meteo: action.payload.meteo,
        };
      case "METEO_DATA": //console.log("orasu",action.payload.city)
        return {
          ...state,
          city: action.payload.city,
        };
      default:
        return state;
    }
  };
  const initialState = {
    meteo: {},
    city: "madagascar",
    input: "",
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
              payload: { city: state.input },
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
        <h3>{state.meteo.message}...</h3>
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
