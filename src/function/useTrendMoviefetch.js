import { useReducer, useEffect } from "react";

export default function useTrendMoviefetch() {
  const initState = {
    loading: false,
    error: null,
    movies: [],
  };

  const [state, dispatch] = useReducer(reducer, initState);

  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "ERROR":
        return { ...state, loading: false, error: action.error };
      case "SUCCESS":
        return { ...state, loading: false, movies: action.data };
      default:
        throw new Error("에러");
    }
  }

  useEffect(() => {
    async function fetchTrendingMovies() {
      dispatch({ type: "LOADING" });
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=a0e37bb376436cf45664b1fa59aa993d&language=ko-KR`
        );
        const data = await response.json();
        dispatch({ type: "SUCCESS", data: data.results });
      } catch (e) {
        dispatch({ type: "ERROR", error: e.message });
      }
    }
    fetchTrendingMovies();
  }, []);

  return state;
}
