import Image from 'next/image';

type CogLogoProps = {
	width: string;
	height: string;
};

export const CogLogo = ({
    width,
    height
}: CogLogoProps) => {
    return (
		<div style={{ padding: '10px' }}>
            <Image
                src={'/images/logo.png'}
                width={width}
                height={height}
                alt="CogPlate"
            />
        </div>
	);
}