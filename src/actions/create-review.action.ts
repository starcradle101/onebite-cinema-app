'use server';

export async function createReviewAction(formData: FormData) {
	const content = formData.get('content')?.toString();
	const author = formData.get('author')?.toString();
	const movieId = formData.get('movieId')?.toString();

	console.log(content, author, movieId);

	if (!content || !author || !movieId) {
		return;
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

		console.log(response.status);
	} catch (error) {
		console.error(error);
		return;
	}
}
