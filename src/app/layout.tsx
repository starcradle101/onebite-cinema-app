import './globals.css';
import Link from 'next/link';
import styles from './layout.module.css';

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
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
				{modal}
				<div id='modal-root'></div>
			</body>
		</html>
	);
}
