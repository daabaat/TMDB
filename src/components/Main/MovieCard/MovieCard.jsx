import "./MovieCard.css";

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
      />
      <div className="content">
        <p className="title">{movie.title}</p>
      </div>
    </div>
  );
}
