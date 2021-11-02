import { CogniteClient } from "@cognite/sdk";
import React, { useState } from "react";

interface AuthContextData {
    client: CogniteClient;
    handleAuthenticate: () => void;
    handleLogout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = React.createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [client, setClient] = useState<CogniteClient>({} as CogniteClient);

    async function handleAuthenticate() {
        try {
            const clientAuth = new CogniteClient({
                appId: 'Lohika/Cognite Onboarding',
                project: 'publicdata',
                apiKeyMode: true,
                getToken: () => Promise.resolve('OWIyZWEwNjctMDFmNy00MjI0LWE5NDctYmRjMTcwYTU0Y2Jj')
            });
    
            clientAuth.authenticate();
            setClient(clientAuth);
        } catch(err) {
            console.log(err);
        }
    }

    async function handleLogout() {}

    return(
        <AuthContext.Provider value={{
            client,
            handleAuthenticate,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);