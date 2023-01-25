import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

import { CustomButton } from '../../customComponents/CustomButton';

import { useNavigation } from '@react-navigation/native';

interface props {
    handleClose: any;
}

export default function ActionModal({handleClose}: props) {

    const navigation = useNavigation();
        
    function navigateInventory() {
        navigation.navigate("inventory");
    }
    function navigateRegisterItem() {
        navigation.navigate("registerItem");
    }
    function navigateRegisterClient() {
        navigation.navigate("registerClient");
    }
    function navigateTasksPage() {
        navigation.navigate("tasksPage");
    }
    function navigateRegisterTaskPage() {
        navigation.navigate("registerNewTask");
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.background}
                onPress={handleClose}
            ></TouchableOpacity>

            <View style={styles.backgroundContent}>
                <View style={styles.content}>
                    
                    <Text style={styles.textMenu}>MENU</Text>  

                    <CustomButton titleButton='Tarefas'onPress={navigateTasksPage}/>
                    <CustomButton titleButton='Cadastro Tarefa' onPress={navigateRegisterTaskPage}/>
                    <CustomButton titleButton='Estoque' onPress={navigateInventory}/>
                    <CustomButton titleButton='Cadastro estoque' onPress={navigateRegisterItem}/>
                    <CustomButton titleButton='Clientes' />
                    <CustomButton titleButton='Cadastro cliente' onPress={navigateRegisterClient}/>
                    <CustomButton titleButton='Funcionários'/>
                    <CustomButton titleButton='Cadastro Funcionario'/>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background:{
        backgroundColor: "#000",
        opacity: 0.2,
        flex:1,
        zIndex:9
    },
    content: {
        marginVertical: 20,
        marginLeft: 10,
        marginRight: 10,
        zIndex: 99,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundContent: {
        backgroundColor: "#FFF"
    },
    textMenu: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});