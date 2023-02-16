import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterClientPage } from '../pages/RegisterClientPage';
import { RegisterItemPage } from '../pages/RegisterItemPage';
import { SignUpPage } from '../pages/SignUpPage';
import { TaskPage } from '../pages/TaskPage';
import { RegisterNewTask } from '../pages/RegisterNewTask';
import { ClientsPage } from '../pages/ClientsPage';
import { EditItemPage } from '../pages/EditItemPage';

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
            <Screen
                name="tasksPage"
                component={TaskPage}
            />
            <Screen
                name="registerNewTask"
                component={RegisterNewTask}
            />
            <Screen
                name="clientsPage"
                component={ClientsPage}
            />
            <Screen
                name="editItemPage"
                component={EditItemPage}
            />
        </Navigator>
    );
}