import { ReactNode } from "react";
import CogSideMenu from "../../organisms/CogSideMenu";
import styles from './CogPage.module.scss';

type CogPageProps = {
	secondMenu?: any;
    children: ReactNode,
};

export const CogPage = ({
    secondMenu,
    children
}: CogPageProps) => {
    return (
		<div className={styles.cogPageContainer}>
			<CogSideMenu />
			{secondMenu ?? ''}
			<main id="main">
				{children}
			</main>
		</div>
	);
}
