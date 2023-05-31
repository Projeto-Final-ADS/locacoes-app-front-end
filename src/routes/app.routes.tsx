import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterClientPage } from '../pages/RegisterClientPage';
import { RegisterItemPage } from '../pages/RegisterItemPage';
import { SignUpPage } from '../pages/SignUpPage';
import { TaskPage } from '../pages/TaskPage';
import { ClientsPage } from '../pages/ClientsPage';
import { EditItemPage } from '../pages/EditItemPage';
import { InventoryPageUser } from '../pages/commonUserPage/InventoryPageUser';
import { RequestLocation } from '../pages/commonUserPage/inventoryPage/requestLocation/RequestLocation';
import { SolicitacionPageUser } from '../pages/commonUserPage/solicitacionPageUser/SolicitacionPageUser';
import { SolicitacionPageAdmin } from '../pages/solicitacionPageAdmin/SolicitacionPageAdmin';
import { EditSolicitacionPage } from '../pages/solicitacionPageAdmin/EditSolicitacionPage';
import { EditLocationPage } from '../pages/EditLocationPage';
import { EditSolicitacionPageUser } from '../pages/commonUserPage/solicitacionPageUser/EditSolicitacionPageUser';
import { AnalyticPageAdmin } from '../pages/AnalyticPageAdmin';
import { CameraPage } from '../pages/CameraPage';

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
                name="clientsPage"
                component={ClientsPage}
            />
            <Screen
                name="editItemPage"
                component={EditItemPage}
            />
            <Screen
                name="inventoryUser"
                component={InventoryPageUser}
            />
            <Screen
                name="requestLocation"
                component={RequestLocation}
            />
            <Screen
                name="solicitacionPageUser"
                component={SolicitacionPageUser}
            />
            <Screen
                name="solicitationPageAdmin"
                component={SolicitacionPageAdmin}
            />

            <Screen
                name="editSolicitacionPage"
                component={EditSolicitacionPage}
            />

            <Screen
                name="editLocationPage"
                component={EditLocationPage}
            />

            <Screen
                name="editSolicitacionPageUser"
                component={EditSolicitacionPageUser}
            />
            
            <Screen
                name="analyticPageAdmin"
                component={AnalyticPageAdmin}
            />

            <Screen
                name="cameraPage"
                component={CameraPage}
            />
            
        </Navigator>
    );
}