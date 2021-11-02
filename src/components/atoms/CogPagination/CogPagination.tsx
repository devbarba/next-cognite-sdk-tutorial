import React from 'react';
import { useRoot } from '../../../contexts/RootContext';

interface CogPaginationProps {
    lastPage: number;
}

import styles from './CogPagination.module.scss';

export const CogPagination = ({ lastPage }: CogPaginationProps) => {
    const { currentPagination, handleCurrentPagination } = useRoot();

    const botoesPagination = [];

	const maxPagesShow = 2;

	for (
		let i = currentPagination - maxPagesShow > 1 ? currentPagination - maxPagesShow : 1;
		i <= maxPagesShow + currentPagination;
		i += 1
	) {
		if (i >= 1 && i <= lastPage) {
			botoesPagination.push(i);
		}
	}

    return(
        lastPage > 1
            ? 
                (
                    <nav
                        className={styles.cogPaginationContainer}
                        aria-label="Pagination"
                    >
                        <button
                            type="button"
                            className={styles.cogPaginationButtonFirst}
                            onClick={() => {
                                handleCurrentPagination(1);
                            }}
                        >
                            <span>
                                <i
                                    className="fas fa-chevron-left"
                                    style={{
                                        paddingLeft: '0.5rem'
                                    }}
                                />
                                <i
                                    className="fas fa-chevron-left"
                                    style={{
                                            marginLeft: '-0.25rem',
                                            paddingRight: '0.5rem'
                                    }}
                                />
                            </span>
                        </button>
                        <button
                            type="button"
                            className={styles.cogPaginationButton}
                            onClick={() => {
                                const newCurrentPage =
                                    currentPagination > 1 ? currentPagination - 1 : 1;
                                    handleCurrentPagination(newCurrentPage);
                            }}
                        >
                            <span>
                                <i
                                    className="fas fa-chevron-left pl-2 pr-2"
                                    style={{
                                        paddingLeft: '0.5rem',
                                        paddingRight: '0.5rem'
                                    }}
                                />
                            </span>
                        </button>
                        {botoesPagination.map(function (index) {
                            const isActiveButton =
                                index === currentPagination ? 'active' : '';
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    className={`${styles.cogPaginationIndexButton} ${isActiveButton}`}
                                    onClick={() => handleCurrentPagination(index)}
                                >
                                    {index}
                                </button>
                            );
                        })}
                        <button
                            type="button"
                            className={styles.cogPaginationButton}
                            onClick={() => {
                                const newCurrentPage =
                                    currentPagination < lastPage ? currentPagination + 1 : lastPage;
                                    handleCurrentPagination(newCurrentPage);
                            }}
                        >
                            <span>
                            <i
                                    className="fas fa-chevron-right"
                                    style={{
                                        paddingLeft: '0.5rem',
                                        paddingRight: '0.5rem'
                                    }}
                                />
                            </span>
                        </button>
                        <button
                            type="button"
                            className={styles.cogPaginationButtonLast}
                            onClick={() => {
                                handleCurrentPagination(lastPage);
                            }}
                        >
                            <span>
                            <i
                                    className="fas fa-chevron-right"
                                    style={{
                                        paddingLeft: '0.5rem'
                                    }}
                                />
                                <i
                                    className="fas fa-chevron-right"
                                    style={{
                                            marginLeft: '-0.25rem',
                                            paddingRight: '0.5rem'
                                    }}
                                />
                            </span>
                        </button>
                    </nav>
                ) 
            :
                null
    );
}