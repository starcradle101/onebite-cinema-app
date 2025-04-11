import MovieItemSkeleton from '@/components/skeleton/movie-item-skeleton';
import styles from '@/app/(with-searchbar)/page.module.css';

export default function RecommendedSkeleton() {
	return (
		<div className={styles.reco_conatiner}>
			{Array.from({ length: 3 }).map((_, idx) => (
				<MovieItemSkeleton key={`reco-skeleton-${idx}`} />
			))}
		</div>
	);
}
