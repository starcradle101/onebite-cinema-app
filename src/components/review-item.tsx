import { ReviewData } from '@/types';
import style from './review-item.module.css';

export default function ReviewItem({
	id,
	content,
	author,
	createdAt,
	movieId,
}: ReviewData) {
	return (
		<div className={style.container}>
			<div className={style.header}>
				<span className={style.author}>{author}</span>
				<span className={style.createdAt}>
					{new Date(createdAt).toLocaleDateString()}일 작성됨
				</span>
			</div>
			<p className={style.content}>{content}</p>
			<button className={style.button}>🗑️ 리뷰 삭제하기</button>
		</div>
	);
}
