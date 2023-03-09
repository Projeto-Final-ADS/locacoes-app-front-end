import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/auth';
import { CustomButton } from '../../../../components/customComponents/CustomButton';

import { useNavigation } from '@react-navigation/native';

interface props {
    handleClose: any;
}

export default function ActionModal({handleClose}: props) {

    const navigation = useNavigation();

    const { signOut } = useContext(AuthContext);

    function navigateLogin() {
        signOut();
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

                    <CustomButton titleButton='Sign Out'onPress={navigateLogin}/>

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