export default function TrendMovie({ movie }) {
  return (
    <div className="trend-movie-container">
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="영화 사진"
      />
      <p>{movie.overview}</p>
      <p>평점: {movie.vote_average}/10</p>
    </div>
  );
}
