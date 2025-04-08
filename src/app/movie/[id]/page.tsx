import styles from './page.module.css';
import { MovieData } from '@/types';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
		{ next: { revalidate: 3600 } }
	);
	if (!response.ok) {
		return <div>오류가 발생했습니다...</div>;
	}

	const movieDetail: MovieData = await response.json();

	const {
		id: movieId,
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
		<div className={styles.container}>
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
		</div>
	);
}
