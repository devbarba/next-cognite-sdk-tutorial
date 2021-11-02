import '../styles/globals.scss';
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { MenuProvider } from '../contexts/MenuContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
            <MenuProvider>
                <Component {...pageProps} />
            </MenuProvider>
      </AuthProvider>
  )
}

export default MyApp
