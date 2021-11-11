import {
    CogniteAuthentication,
    CogniteClient,
    REDIRECT
} from "@cognite/sdk";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextData {
    instance: CogniteAuthentication;
    client: CogniteClient;
    loggedIn: boolean;
    handleLoggedIn: (diff: boolean) => void;
    handleLogout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = React.createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [loggedIn, setLoggedin] = useState(false);
    const [project, setProject] = useState<string>(String(process.env.NEXT_PUBLIC_CDF_PROJECT));
    const [baseUrl, setBaseUrl] = useState<string>(String(process.env.NEXT_PUBLIC_CDF_API));
    const [client, setClient] = useState<CogniteClient>(new CogniteClient({
        appId: 'lohika-cognite-onboarding',
        project: project!,
        getToken
    }));
    const [instance, setInstance] = useState<any>(new CogniteAuthentication({
          project,
    }));

    async function getToken() {
        const tokenCookie = Cookies.get('cdf_token');

        if (tokenCookie) {
            handleLoggedIn(true);
            return tokenCookie;
        }

        if (!instance)  throw new Error("SDK instance missing");
        
        await instance.handleLoginRedirect();
        let token = await instance.getCDFToken();

        if (token) {
            Cookies.set('cdf_token', token.accessToken);
            return token.accessToken;
        }
        
        token = await instance.login({ onAuthenticate: REDIRECT });
        
        if (token) {
            console.log(token.accessToken);
            Cookies.set('cdf_token', token.accessToken);
            return token.accessToken;
        }

        throw new Error("error");
    }

    function handleLoggedIn(diff: boolean) {
        setLoggedin(diff);
    }

    async function handleLogout() {}

    useEffect(() => {
        async function getToken () {
            const tokenCookie = Cookies.get('cdf_token');

            if (tokenCookie) {
                handleLoggedIn(true);
                return tokenCookie;
            }
        }

        getToken();
        loggedIn && client.authenticate();
    }, [loggedIn]);

    return(
        <AuthContext.Provider value={{
            loggedIn,
            instance,
            client,
            handleLoggedIn,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);