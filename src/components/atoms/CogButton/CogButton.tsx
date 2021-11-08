import Link from 'next/link'

import styles from './CogButton.module.scss';

type CogButtonProps = {
	text: string;
    link?: string;
	textColor?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	type?: string;
	buttonColor?: string;
    isLoading?: boolean;
    className?: string;
};

export function CogButton({
    text,
    link,
	textColor,
	onClick,
	type,
	buttonColor,
    isLoading
}: CogButtonProps) {
	return (
		<div className={styles.buttonContainer}>
            {!link ? (
                <button
                    type='button'
                    className={type && type === 'fit' ? styles.buttonFit : ''}
                    style={{
                        ...(textColor) ? {color: textColor} : {},
                        ...(buttonColor) ? {backgroundColor: buttonColor} : {},
                    }}
                    onClick={onClick}
                >
                    {isLoading
                        ? 
                            <img
                                src="/images/loading.svg"
                                alt="Loading"
                                className={styles.buttonSpin}
                            />
                        :
                            text
                    }
                </button>
            ) : (
                <Link
                    href={link}
                >
                    <a
                        style={{
                            ...(textColor) ? {color: textColor} : {},
                            ...(buttonColor) ? {backgroundColor: buttonColor} : {},
                        }}
                    >
                        {isLoading
                            ? 
                                <img
                                    src="/images/loading.svg"
                                    alt=""
                                    className={styles.buttonSpin}
                                />
                            :
                                text
                        }
                    </a>
                </Link>
            )}
		</div>
	);
}