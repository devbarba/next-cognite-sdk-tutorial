import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useFilters } from '../../../contexts/FilterContext';
import { useRoot } from '../../../contexts/RootContext';

import CogButton from '../../atoms/CogButton';
import CogInput from '../../atoms/CogInput';
import styles from './CogFilter.module.scss';
import Button from '@mui/material/Button';

type CogFilterProps = {
	labelSearch?: string;
};

export function CogFilter({ labelSearch }: CogFilterProps) {
	type typeFieldsFiltersPage = {
		[key: string]: string[];
	};

	const defaultLabelSearch = 'Advanced search filters';

	const pathName = useRouter().pathname;

    const { handleCurrentPagination } = useRoot();
    const { filters, handleFilters } = useFilters();

	const [showFilters, setShowFilters] = useState(true);
	const [name, setName] = useState('');
	const [eventName, setEventName] = useState('');
	const [assetId, setAssetId] = useState('');

	const fieldsFilter = [
		{
			label: 'Asset Name',
			type: 'text',
			mask: null,
			value: name,
			keyDown: null,
			onChangeFunction: setName,
		},
		{
			label: 'Event Description',
			type: 'text',
			mask: null,
			value: eventName,
			keyDown: null,
			onChangeFunction: setEventName,
		},
		{
			label: 'Asset ID',
			type: 'text',
			mask: null,
			value: assetId,
			keyDown: null,
			onChangeFunction: setAssetId,
		}
	];

	const filterFieldsPages: typeFieldsFiltersPage = {
		'/': ['Asset Name'],
		'/events': ['Event Description'],
	};

	const filterFieldsPagesAtual = filterFieldsPages[pathName];

	const fieldsFilterExibhition = [fieldsFilter[0]];

	fieldsFilterExibhition.pop();

	fieldsFilter.map((valueFiltros, index) => {
		if (filterFieldsPagesAtual.includes(valueFiltros.label)) {
			fieldsFilterExibhition.push(valueFiltros);
		}
		return null;
	});

	const handleClean = (e: React.FormEvent<HTMLInputElement>) => {
		e.preventDefault();

        handleCurrentPagination(1);
		setName('');
        setAssetId('');
        setEventName('');

		
		handleFilters({
			name: '',
            assetId: '',
            eventName: '',
		});
	};

	const handleFilter = (e: React.FormEvent<HTMLInputElement>) => {
		e.preventDefault();

        handleCurrentPagination(1);
		handleFilters({
			name,
            assetId,
            eventName
		});
	};

	const handleShowFilter = () => {
		setShowFilters(!showFilters);
	};

	return (
		<div
			className={`block-Search-Filters ${
				showFilters ? 'showFilter' : `${styles.cogFilterContainerSecondary}`
			}`}
		>
			<div
				onClick={e => handleShowFilter()}
				className={styles.cogFilterHandleShow}
				aria-hidden="true"
			>
				<i
					className={`fas fa-chevron-${
						showFilters ? 'down' : 'up'
					} mr-2`}
                    style={{
                        marginRight: '0.5rem',
                        cursor: 'pointer'
                    }}
				/>
				{labelSearch ?? defaultLabelSearch}
			</div>
			<div
				className={`${styles.cogFilterDisable}${
					showFilters ? '' : ' disableFilters'
				}`}
			>
				<div className={styles.cogFilterInputContainer}>
					{fieldsFilterExibhition.map((field, idx) => {
						return (
							<div key={idx} className={styles.cogFilterInputContainerInside}>
								<CogInput
									label={field.label}
									type={field.type}
									placeholder="Digite..."
									onChange={(
										e: React.FormEvent<HTMLInputElement>,
									) =>
										field.onChangeFunction(
											e.currentTarget.value,
										)
									}
									onKeyPress={(e: any) => {
										if (e.key === 'Enter') {
											handleFilter(e);
										}
									}}
									onKeyDown={field.keyDown}
									value={field.value}
                                    // @ts-ignore
                                    options={field.options}
								/>
							</div>
						);
					})}
				</div>
				<div style={{ flexDirection: 'row', textAlign: 'right' }}>
					<div style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                        <CogButton
                            text={'Clear Filters'}
                            // buttonColor={'#FFFFFF'}
                            textColor={'#000000'}
                            type={'fit'}
                            //@ts-ignore
                            onClick={(e: React.FormEvent<HTMLInputElement>) =>
                                handleClean(e)
                            }
                            classesBlockOption={styles.cogFilterButtons}
                        />
                    </div>

                    <div style={{ display: 'inline-block' }}>
                        <CogButton
                            text={'Filter'}
                            textColor={'#FFFFFF'}
                            type={'fit'}
                            //@ts-ignore
                            onClick={(e: React.FormEvent<HTMLInputElement>) =>
                                handleFilter(e)
                            }
                            classesBlockOption={'inline-block'}
                        />
                    </div>
				</div>
			</div>
		</div>
	);
};