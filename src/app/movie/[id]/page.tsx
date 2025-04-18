import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { MovieData, ReviewData } from '@/types';
import ReviewEditor from '@/components/review-editor';
import ReviewItem from '@/components/review-item';
import Image from 'next/image';
import { Metadata } from 'next';

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

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id?: string }>;
}): Promise<Metadata> {
	const { id } = await params;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
		{ cache: 'force-cache' }
	);
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const movieDetail: MovieData = await response.json();

	return {
		title: `${movieDetail.title} - 한입 씨네마`,
		description: `${movieDetail.description} - 한입 씨네마`,
		openGraph: {
			title: movieDetail.title,
			description: movieDetail.description,
			images: [movieDetail.posterImgUrl],
		},
	};
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
				<Image
					src={posterImgUrl}
					width={263.34}
					height={395}
					alt={`${title}의 영화 포스터`}
				/>
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
