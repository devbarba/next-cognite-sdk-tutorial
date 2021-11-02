import { createContext, ReactNode, useEffect, useState } from 'react';
import menus from './store/menu.json';

interface Menu {
    label: string;
    link: string;
    icon: string;
}[]

interface MenuContextData {
    currentMenu: Menu[];
}

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuContext = createContext({} as MenuContextData);

export function MenuProvider({ children }: MenuProviderProps) {
    const [menu, setMenu] = useState<any>([]);

    useEffect(() => {
        setMenu(menus);
    }, []);

    return(
        <MenuContext.Provider
            value={{
                currentMenu: menu,
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}