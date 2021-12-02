import { ReactNode } from "react";
import styles from './HomePage.module.scss';

type HomePageProps = {
    children: ReactNode,
};

export const HomePage = ({
    children
}: HomePageProps) => {
    return (
		<div className={styles.homePageContainer}>
			<main id="main">
				{children}
			</main>
		</div>
	);
}
