import MovieItem from '@/components/movie-item';
import styles from './page.module.css';
import { MovieData } from '@/types';
import { Suspense } from 'react';
import RecommendedSkeleton from '@/components/skeleton/recommended-skeleton';

async function SearchResult({ q }: { q: string }) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
		{ cache: 'force-cache' }
	);
	if (!response.ok) {
		return <div>오류가 발생했습니다...</div>;
	}

	const searchResults: MovieData[] = await response.json();

	return (
		<div className={styles.container}>
			{searchResults.map((movie) => (
				<MovieItem key={movie.id} {...movie} />
			))}
		</div>
	);
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ q?: string }>;
}) {
	const { q } = await searchParams;

	return (
		<Suspense key={q || ''} fallback={<RecommendedSkeleton />}>
			<SearchResult q={q || ''} />
		</Suspense>
	);
}
