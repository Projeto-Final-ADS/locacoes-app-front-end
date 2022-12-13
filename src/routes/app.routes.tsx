import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterClientPage } from '../pages/RegisterClientPage';
import { RegisterItemPage } from '../pages/RegisterItemPage';
import { SignUpPage } from '../pages/SignUpPage';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator
            initialRouteName='login'
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="login"
                component={LoginPage}
            />
            <Screen
                name="signup"
                component={SignUpPage}
            />
            <Screen
                name="forgotpassword"
                component={ForgotPasswordPage}
            />
            <Screen
                name="inventory"
                component={InventoryPage}
            />
            <Screen
                name="registerItem"
                component={RegisterItemPage}
            />
            <Screen
                name="registerClient"
                component={RegisterClientPage}
            />
        </Navigator>
    );
}