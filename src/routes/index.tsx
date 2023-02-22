import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';

import AuthProvider from '../contexts/auth';

export function Routes() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <AppRoutes/>
            </AuthProvider>
        </NavigationContainer>
    );
}