import React, { useState } from "react";
import MovieCard from "../../Main/MovieCard/MovieCard";
import "./Search.css"; // 검색창 스타일링 추가

export default function Search() {
  const [query, setQuery] = useState(""); // 검색어 상태
  const [movies, setMovies] = useState([]); // 검색 결과 상태
  const [showResults, setShowResults] = useState(false); // 검색 결과 표시 상태
  const key = import.meta.env.VITE_API_KEY;

  // 실시간 검색 핸들러
  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${key}&language=ko-KR`
      );
      const data = await response.json();
      setMovies(data.results); // 검색 결과 저장
      setShowResults(true); // 검색 결과 모달 표시
    } else {
      setMovies([]); // 검색어가 없으면 결과를 초기화
      setShowResults(false); // 모달 닫기
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="영화 제목을 입력하세요"
        value={query}
        onChange={handleSearch} // 입력할 때마다 검색 수행
        onKeyUp={handleSearch} // 키보드 입력 이벤트
      />
      {/* 검색 결과 모달 */}
      {showResults && (
        <div className="search-results">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}
