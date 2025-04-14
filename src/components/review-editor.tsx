import { createReviewAction } from '@/actions/create-review.action';
import styles from './review-editor.module.css';

export default function ReviewEditor({ movieId }: { movieId: string }) {
	return (
		<section>
			<form className={styles.form_container} action={createReviewAction}>
				<input name='movieId' value={movieId} hidden readOnly />
				<textarea name='content' placeholder='리뷰 남기기' required />
				<div className={styles.submit_container}>
					<input name='author' placeholder='작성자' required />
					<button type='submit'>작성하기</button>
				</div>
			</form>
		</section>
	);
}
