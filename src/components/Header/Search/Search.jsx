import React, { useState } from "react";
import MovieCard from "../../Main/MovieCard/MovieCard";
import "./Search.css"; // 검색창 스타일링 추가
import Modal from "../../Modal/Modal";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 상태 관리
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태 관리
  const key = import.meta.env.VITE_API_KEY;

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${key}&language=ko-KR`
      );
      const data = await response.json();
      setMovies(data.results);
      setShowResults(true);
    } else {
      setMovies([]);
      setShowResults(false);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // 선택된 영화 저장
    setShowModal(true); // 모달 표시
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="영화 제목을 입력하세요"
        value={query}
        onChange={handleSearch}
        onKeyUp={handleSearch}
      />

      {/* 검색 결과 모달 */}
      {showResults && (
        <div className="search-results">
          <div className="movie-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card-wrapper"
                onClick={() => handleMovieClick(movie)}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 영화 정보 모달 */}
      {showModal && (
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          movie={selectedMovie}
        />
      )}
    </div>
  );
}
