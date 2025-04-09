import SearchBar from '@/components/searchbar';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Suspense fallback={<div>로딩 중...</div>}>
				<SearchBar />
			</Suspense>
			{children}
		</div>
	);
}
