'use server';

import { revalidateTag } from 'next/cache';

export async function createReviewAction(_: any, formData: FormData) {
	const content = formData.get('content')?.toString();
	const author = formData.get('author')?.toString();
	const movieId = formData.get('movieId')?.toString();

	if (!content || !author || !movieId) {
		return {
			status: false,
			error: '리뷰 내용과 작성자를 입력해 주세요',
		};
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
			{
				method: 'POST',
				body: JSON.stringify({
					movieId: movieId,
					content: content,
					author: author,
				}),
			}
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		revalidateTag(`review-${movieId}`);
		return {
			status: true,
			error: '',
		};
	} catch (error) {
		return {
			status: false,
			error: `리뷰 저장에 실패했습니다: ${error}`,
		};
	}
}
