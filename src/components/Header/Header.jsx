import useTrendMoviefetch from "../../function/useTrendMoviefetch";
import Slider from "react-slick";
import "./Header.css"; // 스타일링을 위해 별도 파일 추가
import Modal from "../Modal/Modal";
import { useState } from "react";
import Search from "./Search/Search";

export default function Header() {
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택한 영화 상태 관리
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태 관리

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // 클릭한 영화 정보 저장
    setShowModal(true); // 모달 표시
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
  };

  const {
    loading: trendLoading,
    error: trendError,
    movies: trendMovies,
  } = useTrendMoviefetch(); // 트렌드 영화 호출

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    fade: true, // fade 효과 추가
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    centerMode: true, // 중앙에 영화 포스터를 배치
    centerPadding: "20%", // 양옆 포스터 크기 조정
  };

  return (
    <div className="header">
      <h1>지금 떠오르는 영화</h1>
      <Search /> {/* 검색 컴포넌트 추가 */}
      {trendLoading && <p>로딩중 ...</p>}
      {trendError && <p>{trendError}</p>}
      {!trendLoading &&
        !trendError &&
        trendMovies &&
        trendMovies.length > 0 && (
          <div className="trend-movie-carousel">
            <Slider {...settings}>
              {trendMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="slider-item"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    className="main-poster"
                    src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      {/* 모달 추가 */}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        movie={selectedMovie}
      />
    </div>
  );
}
