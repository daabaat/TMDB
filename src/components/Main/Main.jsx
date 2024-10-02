import { useState } from "react";
import GenreMovieSlider from "./GenreMovieSlider/GenreMovieSlider";
import useMoviefetch from "../../function/useMoviefetch";
import Modal from "../Modal/Modal";
import "./Main.css";

const Main = () => {
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택한 영화 상태 관리
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태 관리

  // 캐러셀 설정
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: false,
    draggable: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // 클릭한 영화 정보 저장
    setShowModal(true); // 모달 표시
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
  };

  // 장르별 데이터 호출
  const {
    loading: actionLoading,
    error: actionError,
    movies: actionMovies,
  } = useMoviefetch(28); // 액션
  const {
    loading: warLoading,
    error: warError,
    movies: warMovies,
  } = useMoviefetch(10752); // 전쟁
  const {
    loading: horrorLoading,
    error: horrorError,
    movies: horrorMovies,
  } = useMoviefetch(27); // 공포
  const {
    loading: comedyLoading,
    error: comedyError,
    movies: comedyMovies,
  } = useMoviefetch(35); // 코미디
  const {
    loading: fantasyLoading,
    error: fantasyError,
    movies: fantasyMovies,
  } = useMoviefetch(14); // 판타지

  return (
    <div className="main">
      {/* 액션 영화 캐러셀 */}
      <GenreMovieSlider
        title="액션"
        loading={actionLoading}
        error={actionError}
        movies={actionMovies}
        settings={settings}
        onMovieClick={handleMovieClick}
      />

      {/* 전쟁 영화 캐러셀 */}
      <GenreMovieSlider
        title="전쟁"
        loading={warLoading}
        error={warError}
        movies={warMovies}
        settings={settings}
        onMovieClick={handleMovieClick}
      />

      {/* 공포 영화 캐러셀 */}
      <GenreMovieSlider
        title="공포"
        loading={horrorLoading}
        error={horrorError}
        movies={horrorMovies}
        settings={settings}
        onMovieClick={handleMovieClick}
      />

      {/* 코미디 영화 캐러셀 */}
      <GenreMovieSlider
        title="코미디"
        loading={comedyLoading}
        error={comedyError}
        movies={comedyMovies}
        settings={settings}
        onMovieClick={handleMovieClick}
      />

      {/* 판타지 영화 캐러셀 */}
      <GenreMovieSlider
        title="판타지"
        loading={fantasyLoading}
        error={fantasyError}
        movies={fantasyMovies}
        settings={settings}
        onMovieClick={handleMovieClick}
      />

      {/* 선택한 영화 모달 */}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Main;
