import MovieItem from '@/components/movie-item';
import movies from '@/dummy.json';
import styles from './page.module.css';

export default function Page() {
	return (
		<div className={styles.container}>
			{movies.map((movie) => (
				<MovieItem key={movie.id} {...movie} />
			))}
		</div>
	);
}
