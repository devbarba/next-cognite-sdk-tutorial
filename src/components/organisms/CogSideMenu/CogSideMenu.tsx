import { useRouter } from 'next/router'
import Link from 'next/link'
import CogLogo from '../../atoms/CogLogo';
import CogMenuIcon from "../../atoms/CogMenuIcon";
import styles from './CogSideMenu.module.scss';
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../../contexts/MenuContext';

interface IMenu {
    link: string;
    label: string;
    icon: string;
}

export const CogSideMenu = () => {
    const router = useRouter();
    const pathName = router.pathname;
    const [menus, setMenus] = useState<IMenu[]>([] as IMenu[]);
	const { currentMenu } = useContext(MenuContext);
    
    useEffect(() => {
        let newMenus: any = [];
        currentMenu.forEach(cM => {
            newMenus.push(cM);
        });

        setMenus(newMenus)
    }, [currentMenu ]);

	return (
		<aside className={styles.cogSideMenuContainer}>
            {/* <Link passHref={true} href='/'> */}
				<CogLogo width='300px' height='255px' />
            {/* </Link> */}

			<nav className="menu">
				{menus.map(icon => {
					return (
						<CogMenuIcon 
							key={icon.link}
							label={icon.label}
							link={icon.link}
							icon={icon.icon}
							pathName={pathName}
						/>
					);

				})}
				
			</nav>
		</aside>
	);
}