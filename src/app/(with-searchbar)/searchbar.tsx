'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const q = searchParams.get('q');
	const [search, setSearch] = useState(q || '');

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const onSubmit = () => {
		if (search.trim()) router.push(`/search?q=${search}`);

		return;
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onSubmit();
	};

	return (
		<div>
			<input
				placeholder='검색어를 입력하세요...'
				type='text'
				value={search}
				onChange={onChangeSearch}
				onKeyDown={onKeyDown}
			/>
			<button onClick={onSubmit}>검색</button>
		</div>
	);
}
