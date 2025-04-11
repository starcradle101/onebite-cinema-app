import MovieItemSkeleton from '@/components/skeleton/movie-item-skeleton';
import styles from '@/app/(with-searchbar)/page.module.css';

export default function AllMoviesSkeleton() {
	return (
		<div className={styles.all_container}>
			{Array.from({ length: 10 }).map((_, idx) => (
				<MovieItemSkeleton key={`all-skeleton-${idx}`} />
			))}
		</div>
	);
}
