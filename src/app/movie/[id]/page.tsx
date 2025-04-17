import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { MovieData, ReviewData } from '@/types';
import ReviewEditor from '@/components/review-editor';
import ReviewItem from '@/components/review-item';

export async function generateStaticParams() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
		{
			cache: 'force-cache',
		}
	);

	if (!response.ok) {
		throw new Error('정적 페이지 생성을 위한 데이터 페칭 실패');
	}

	const movies: MovieData[] = await response.json();

	return movies.map((movie) => ({
		id: movie.id.toString(),
	}));
}

async function MovieDetail({ movieId }: { movieId: string }) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
		{ cache: 'force-cache' }
	);
	if (!response.ok) {
		if (response.status === 404) {
			notFound();
		}
	}

	const movieDetail: MovieData = await response.json();

	const {
		title,
		subTitle,
		company,
		runtime,
		description,
		posterImgUrl,
		releaseDate,
		genres,
	} = movieDetail;

	return (
		<section className={styles.container}>
			<div
				className={styles.cover_img_container}
				style={{ backgroundImage: `url('${posterImgUrl}')` }}
			>
				<img src={posterImgUrl} />
			</div>
			<div className={styles.info_container}>
				<div>
					<h2>{title}</h2>
					<div>
						{releaseDate} / {genres.join(', ')} / {runtime}분
					</div>
					<div>{company}</div>
				</div>
				<div>
					<div className={styles.subTitle}>{subTitle}</div>
					<div className={styles.description}>{description}</div>
				</div>
			</div>
		</section>
	);
}

async function ReviewList({ movieId }: { movieId: string }) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`,
		{ next: { tags: [`review-${movieId}`] } }
	);

	if (!response.ok) {
		throw new Error(`Review fetch failed: ${response.statusText}`);
	}

	const reviews: ReviewData[] = await response.json();

	return (
		<section>
			{reviews.map((review) => (
				<ReviewItem key={`review-item-${review.id}`} {...review} />
			))}
		</section>
	);
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<>
			<MovieDetail movieId={id} />
			<ReviewEditor movieId={id} />
			<ReviewList movieId={id} />
		</>
	);
}
