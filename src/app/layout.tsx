import './globals.css';
import Link from 'next/link';
import styles from './layout.module.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='kr'>
			<body>
				<div className={styles.container}>
					<header>
						<Link href={'/'}>ONEBITE CINEMA</Link>
					</header>
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
