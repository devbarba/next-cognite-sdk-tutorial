import { useState } from 'react';
import styles from './CogInput.module.scss';

type CogInputProps = {
	label: string;
	type: string;
	placeholder: string;
	onChange?: any;
	value?: string;
	required?: boolean;
    description?: string;
    handleDrop?: any;
    onChangeFile?: any;
	onKeyPress?: any;
	onKeyDown?: any;
    width?: number;
    readOnly?: boolean;
    options?: { label: any, value: any }[]
	checked?: boolean;
	minLength?: number;
	maxLength?: number;
};

export function CogInput({
    label,
	type,
	placeholder,
	onChange,
	value,
	required,
    description,
	onKeyPress,
	onKeyDown,
	handleDrop,
    width,
    onChangeFile,
    readOnly,
    options,
    checked,
    maxLength,
    minLength,
}: CogInputProps) {
    const [isPassword, setIsPassword] = useState(type === 'password' ? true : false);
    const [showIcon, setShowIcon] = useState('eye-show');
    const [fakeType, setFakeType] = useState('');

    const defaultLabel = 'Sua Label';

    function handleIcon() {
		if (showIcon === 'eye-show') {
			setShowIcon('eye-hide');
			setFakeType('text');
		} else {
			setShowIcon('eye-show');
			setFakeType('password');
		}
	}

    return (
        // @ts-ignore
		<div className={styles.inputContainer} style={type === 'checkbox' ? { width: `${width}%`, flexDirection: 'row', alignItems: 'center' } : { width: `${width}%` }}>
			<label htmlFor={label ?? defaultLabel}>
				{label ?? defaultLabel}
			</label>
            {description ? (
                <span className="-mt-2 mb-1 opacity-50 text-sm block">
                    {description}
                </span>
            ) : null}
			{
				type === 'password' || isPassword
					?
						<div>
							<input
								type={fakeType ? fakeType : type}
								name={label}
								placeholder={placeholder}
								onChange={onChange}
								value={value ?? ''}
								onKeyPress={onKeyPress}
								onKeyDown={onKeyDown}
								required={required ?? false}
                                readOnly={readOnly ?? false}
							/>
							<button onClick={() => handleIcon()}>
								<img src={`/images/${showIcon}.svg`} alt="Show" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
							</button>
						</div>
                    :
                        type === 'select'
                            ?
                                <select
                                    name={label}
                                    onChange={onChange}
                                    onKeyPress={onKeyPress}
                                    onKeyDown={onKeyDown}
                                    required={required ?? false}
                                >
                                    <option>{placeholder}</option>
                                    {
                                        // @ts-ignore
                                        options.map((option: any) => {
                                            // @ts-ignore
                                            return <option selected={String(value) === String(option.value)} value={option.value}>{option.label}</option>
                                        })
                                    }
                                </select>
                            :
                                type === 'textarea'
                                    ?
                                        <textarea
                                            rows={10}
                                            name={label}
                                            placeholder={placeholder}
                                            onChange={onChange}
                                            value={value ?? ''}
                                            onKeyPress={onKeyPress}
                                            onKeyDown={onKeyDown}
                                            required={required ?? false}
                                            readOnly={readOnly ?? false}
                                        >

                                        </textarea>
                                    :   
                                        type === 'checkbox'
                                            ?
                                                <input
                                                    type={type}
                                                    name={label}
                                                    placeholder={placeholder}
                                                    onChange={onChange}
                                                    checked={checked}
                                                    required={required ?? false}
                                                    readOnly={readOnly ?? false}
                                                    style={{ ...(type === 'checkbox' ? { width: '10%'} : {})}}
                                                />
                                            :
                                                <input
                                                    type={type}
                                                    name={label}
                                                    placeholder={placeholder}
                                                    onChange={onChange}
                                                    value={value ?? ''}
                                                    onKeyPress={onKeyPress}
                                                    onKeyDown={onKeyDown}
                                                    required={required ?? false}
                                                    readOnly={readOnly ?? false}
                                                    maxLength={maxLength}
                                                    minLength={minLength}
                                                />
			}
		</div>
	);
}