import styles from './page.module.css';
import movies from '@/dummy.json';

export default function Page() {
	const {
		id,
		title,
		subTitle,
		company,
		runtime,
		description,
		posterImgUrl,
		releaseDate,
		genres,
	} = movies[0];

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
