import { ReactNode } from 'react';

import styles from './CogRoundedContainer.module.scss';

type CogRoundedContainerProps = {
	color?: string;
    width?: string;
    children: ReactNode
};

export const CogRoundedContainer = ({
    color,
    width,
    children
}: CogRoundedContainerProps) => {
    return <div className={styles.cogRoundedContainer}
        style={{
            ...(width ? { maxWidth: '29.375rem' } : { width: '100%' } ),
        }}
    >{children}</div>;
}