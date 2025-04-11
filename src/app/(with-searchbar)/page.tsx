import MovieItem from '@/components/movie-item';
import styles from './page.module.css';
import { MovieData } from '@/types';
import { Suspense } from 'react';
import MovieItemSkeleton from '@/components/skeleton/movie-item-skeleton';
import RecommendedSkeleton from '@/components/skeleton/recommended-skeleton';
import AllMoviesSkeleton from '@/components/skeleton/all-movies-skeleton';

export const dynamic = 'force-dynamic';

async function AllMovies() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
		{ next: { revalidate: 60 * 60 } }
	);
	if (!response.ok) {
		return <div>오류가 발생했습니다...</div>;
	}
	const allMovies: MovieData[] = await response.json();

	return (
		<div className={styles.all_container}>
			{allMovies.map((movie) => (
				<MovieItem key={`all-${movie.id}`} {...movie} />
			))}
		</div>
	);
}

async function RecommendedMovies() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
		{ next: { revalidate: 60 * 60 } }
	);
	if (!response.ok) {
		return <div>오류가 발생했습니다...</div>;
	}
	const recommendedMovies: MovieData[] = await response.json();

	return (
		<div className={styles.reco_conatiner}>
			{recommendedMovies.map((movie) => (
				<MovieItem key={`reco-${movie.id}`} {...movie} />
			))}
		</div>
	);
}

export default async function Home() {
	return (
		<div className={styles.conatiner}>
			<section>
				<h3>지금 가장 추천하는 영화</h3>
				<Suspense fallback={<RecommendedSkeleton />}>
					<RecommendedMovies />
				</Suspense>
			</section>
			<section>
				<h3>등록된 모든 영화</h3>
				<Suspense fallback={<AllMoviesSkeleton />}>
					<AllMovies />
				</Suspense>
			</section>
		</div>
	);
}
