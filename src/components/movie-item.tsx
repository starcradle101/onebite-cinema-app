import { MovieData } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import style from './movie-item.module.css';

type MovieItemProps = MovieData & {
	/** 'small' = 156×234, 'large' = 263.34×395 */
	size?: 'small' | 'large';
};

export default function MovieItem({
	id,
	title,
	posterImgUrl,
	size = 'small',
}: MovieItemProps) {
	const dimensions = {
		small: { width: 156, height: 234 },
		large: { width: 263.34, height: 395 },
	} as const;
	const { width, height } = dimensions[size];

	return (
		<Link className={style.container} href={`/movie/${id}`}>
			<Image
				src={posterImgUrl}
				width={width}
				height={height}
				alt={`영화 ${title}의 포스터 이미지`}
			/>
		</Link>
	);
}
