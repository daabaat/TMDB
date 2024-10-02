import { useReducer, useEffect } from "react";

export default function useMoviefetch(genreId) {
  const key = import.meta.env.VITE_API_KEY;
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
    async function fetchMovies() {
      dispatch({ type: "LOADING" });
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=ko-KR&with_genres=${genreId}`
        );
        const data = await response.json();
        dispatch({ type: "SUCCESS", data: data.results });
      } catch (e) {
        dispatch({ type: "ERROR", error: e.message });
      }
    }
    fetchMovies();
  }, [genreId]);

  return state;
}
