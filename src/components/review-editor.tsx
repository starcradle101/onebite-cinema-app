'use client';
import { useActionState, useEffect } from 'react';

import { createReviewAction } from '@/actions/create-review.action';
import styles from './review-editor.module.css';

export default function ReviewEditor({ movieId }: { movieId: string }) {
	const [state, formAction, isPending] = useActionState(
		createReviewAction,
		null
	);

	useEffect(() => {
		if (state && !state.status) {
			alert(state.error);
		}
	}, [state]);

	return (
		<section>
			<form className={styles.form_container} action={formAction}>
				<input name='movieId' value={movieId} hidden readOnly />
				<textarea
					name='content'
					placeholder='리뷰 남기기'
					required
					disabled={isPending}
				/>
				<div className={styles.submit_container}>
					<input
						name='author'
						placeholder='작성자'
						required
						disabled={isPending}
					/>
					<button type='submit' disabled={isPending}>
						{isPending ? '...' : '작성하기'}
					</button>
				</div>
			</form>
		</section>
	);
}
