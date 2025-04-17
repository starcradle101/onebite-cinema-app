import { ReviewData } from '@/types';
import style from './review-item.module.css';
import ReviewItemDeleteButton from './review-item-delete-button';

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
			<div className={style.button}>
				<ReviewItemDeleteButton reviewId={id} movieId={movieId} />
			</div>
		</div>
	);
}
