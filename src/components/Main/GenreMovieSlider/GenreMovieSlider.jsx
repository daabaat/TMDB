import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";
import "./GenreMovieSlider.css"; // 별도의 스타일링 추가

const GenreMovieSlider = ({
  title,
  loading,
  error,
  movies,
  settings,
  onMovieClick,
}) => {
  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`genre-movie-slider`}>
      <h2 className="genre-movie-h2">{title}</h2>
      <div className="carousel-container">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} onClick={() => onMovieClick(movie)}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GenreMovieSlider;
