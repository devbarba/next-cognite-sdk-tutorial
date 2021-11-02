import React from 'react';
import Tippy from '@tippyjs/react';

import CogPagination from '../../atoms/CogPagination';
import { useRoot } from '../../../contexts/RootContext';

interface CogTableProps {
	tableData: {
		headers: string[];
		data: any[];
        asterisc?: number[];
	};
	noneMessage: string;
	contentType: {
		columnIndex: number;
		type: string;
		content?: string;
	}[];
    lastPage: number;
}

export const CogTable = ({
	tableData,
	noneMessage,
	contentType,
    lastPage
}: CogTableProps) => {
    const { loading } = useRoot();

	return (
        <>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            {tableData.headers.map((header, idx) => {
                                return (
                                    <th key={idx}>{header}{tableData.asterisc && tableData.asterisc.includes(idx) ? <span style={{ color: 'red' }}>*</span> : <></>}</th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !loading
                                ?
                                    tableData && tableData.data && tableData.data.length > 0 ? (
                                        tableData.data.map((row, idxOne) => {
                                            const actualRow: any[] = [];
                                            let itemId = 0;
            
                                            Object.keys(row).forEach(rowItem => {
                                                actualRow.push(row[rowItem]);
                                            });
                                            return (
                                                <tr key={idxOne}>
                                                    {actualRow.map((item, idxTwo) => {
                                                        return contentType?.map((content, idx) => {
                                                            if (content.columnIndex === idxTwo) {
                                                                itemId = actualRow[0];
            
                                                                if (content.type === 'badge') {
                                                                    return (
                                                                        <td
                                                                            key={idx}
                                                                            // style={{
                                                                            // 	display: 'flex',
                                                                            // 	justifyContent:
                                                                            // 		'center',
                                                                            // }}
                                                                        >
                                                                            <div className="badge badge-pill badge-info">
                                                                                {item}
                                                                            </div>
                                                                        </td>
                                                                    );
                                                                }
                                                                
                                                                if (content.type === 'hide') {
                                                                    return (
                                                                        <td key={idx}><i onClick={() => navigator.clipboard.writeText(item)} style={{ cursor: 'copy' }} className="far fa-copy"></i>{` ${String(item).substr(0, 14)}...`}</td>
                                                                    )
                                                                }
                                                                
                                                                if (content.type === 'tippy') {
                                                                    return (
                                                                        <td
                                                                            style={{
                                                                                justifyContent: 'flex-start'
                                                                            }}
                                                                        >
                                                                            <Tippy
                                                                                key={idx}
                                                                                content={
                                                                                    content.content ===
                                                                                    'date'
                                                                                        ? item.hour
                                                                                        : content.content === 'other'
                                                                                            ?
                                                                                                item.value
                                                                                            :
                                                                                                item
                                                                                }
                                                                                
                                                                            >
                                                                                <p style={{ ...(item.color ? { color: item.color } : { } ) }}>
                                                                                    {
                                                                                        content.content === 'date'
                                                                                            ?
                                                                                                item.date
                                                                                            : content.content === 'other'
                                                                                                    ?
                                                                                                        item.tippy
                                                                                                    :
                                                                                                        item
                                                                                    }
                                                                                </p>
                                                                            </Tippy>
                                                                        </td>
                                                                    )
                                                                }
                                                                
                                                                if(content.type === 'normal') {
                                                                    return (
                                                                        <td key={idx}>{item}</td>
                                                                    )
                                                                }

                                                                if(content.type === 'percent') {
                                                                    return (
                                                                        <td key={idx}><p style={{ ...(item.replace('%', '') > 0 ? { color: 'var(--border-green)' } : item.replace('%', '') < 0 ? { color: 'var(--red)' } : { color : 'var(--text-blue-light)' } )}}>{item}</p></td>
                                                                    )
                                                                }
                                                            }
            
                                                            return <></>;
                                                        });
                                                    })}
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={tableData.headers.length}
                                                style={{
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {noneMessage}
                                            </td>
                                        </tr>
                                    )
                                :
                                    <tr>
                                        <td
                                            colSpan={tableData.headers.length}
                                            style={{
                                                textAlign: 'center'
                                            }}
                                            >
                                            <img alt="Loading" src="/images/loading.gif" style={{ width: 25, height: 25 }} />
                                        </td>
                                    </tr>
                        }
                    </tbody>
                </table>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem'
                }}
            >
                <CogPagination lastPage={lastPage} />
            </div>
        </>
	);
};