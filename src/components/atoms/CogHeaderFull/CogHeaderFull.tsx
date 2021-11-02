import { ReactNode } from "react";

import styles from './CogHeaderFull.module.scss';

type CogHeaderFullProps = {
	label: string;
	icon: string;
    children: ReactNode
};

export const CogHeaderFull = ({
    label,
	icon,
	children
}: CogHeaderFullProps) => {
	return (
		<header className={styles.cogHeaderFullContainer}>
			<div>
				<i
					className={icon}
				/>
				<span>
					{label}
				</span>
			</div>
			<div className="flex-1">{children}</div>
		</header>
	);
}