import { useNavigation} from '@react-navigation/native';
import React, { createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SignIn } from '../services/signIn';

export interface AuthData {
    token?: string;
    name?: string;
    lastName?: string;
    role?: string;
}

export interface Error {
    success: boolean;
    message?: string;
}

interface AuthContextData {
    authData?: AuthData;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoading: boolean;
    error: Error;
}

interface Props {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider ({children}:Props) {
    const navigation = useNavigation();

    const [authData, setAuthData] = useState<AuthData>();
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState<Error>({success:true});

    useEffect(() => {
      loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
        try {
          //Try get the data from Async Storage
          const authDataSerialized = await AsyncStorage.getItem('@AuthData');
          if (authDataSerialized) {
            //If there are data, it's converted to an Object and the state is updated.
            const _authData: AuthData = JSON.parse(authDataSerialized);
            setAuthData(_authData);
          }
        } catch (error) {
        } finally {
          setisLoading(false);
        }
    }

    const saveAuthData = async (authData:AuthData) => {
        try {
            return await AsyncStorage.setItem('@AuthData', JSON.stringify(authData));
        } catch(error) {
            console.log(error)
        }
    }

    const saveAuthToken = async (token:string) => {
        try {
            return await AsyncStorage.setItem('@AuthToken', token);
        } catch(error) {
            console.log(error)
        }
    }

    async function signIn(email: string, password: string) {
        if (email !== '' && password !== '') {

            const response = await SignIn({email_username: email, password});

            if (response != undefined) {
                if (response.data.sucesso == true) {
                    const responseAuthData = {
                        token: response.data.usuario.token,
                        name: response.data.usuario.nome,
                        lastName: response.data.usuario.sobrenome,
                        role: response.data.usuario.role
                    }
    
                    await setAuthData(responseAuthData);
                    await saveAuthData(responseAuthData);
                    await saveAuthToken(responseAuthData.token);
                    setError({success: true});
    
                    if (response.data.usuario.role === "Usuario")
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'inventoryUser'}],
                        });
    
                    if (response.data.usuario.role === "Administrador")
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'tasksPage'}],
                        });
                } else {
                    setError({success: false});
                }
                
            }
        }
    }

    async function signOut() {
        setAuthData(undefined);
        AsyncStorage.removeItem('@AuthData');
        navigation.reset({
            index: 0,
            routes: [{name: 'login'}],
        });
    }

    return (
        <AuthContext.Provider value={{authData, signIn, signOut, isLoading, error}}>
            {children}
        </AuthContext.Provider>
    );
}