import '../styles/globals.scss';
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { MenuProvider } from '../contexts/MenuContext'
import { RootProvider } from '../contexts/RootContext';
import { FilterProvider } from '../contexts/FilterContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RootProvider>
            <AuthProvider>
                <MenuProvider>
                    <FilterProvider>
                        <Component {...pageProps} />
                    </FilterProvider>
                </MenuProvider>
            </AuthProvider>
        </RootProvider>
    )
}

export default MyApp
