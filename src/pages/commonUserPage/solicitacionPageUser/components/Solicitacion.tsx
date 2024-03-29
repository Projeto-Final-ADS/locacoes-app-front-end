import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { Status } from '../../solicitacionPageUser/components/Status';

import { useNavigation } from '@react-navigation/native';

const infoIconImage = require('../../../../../resources/icons/info-icon.png');

interface Solicitacion {
    dateOpen: string;
    dateDelivery: string;
    totalItems: number;
    solicitacionID: number;
    client: string;
    statusSolicitacion: string;
    productList: undefined;
    addressEvent: undefined;
    toRecallLocationDate: string;
}

export function Solicitacion(props: Solicitacion) {
    const navigation = useNavigation();

    const dateOpenConverted = new Date(props.dateOpen);
    const dateDeliveryConverted = new Date(props.dateDelivery);
    const dateToRecallConverted = new Date(props.toRecallLocationDate);

    const formatedDateOpen = formatDate(dateOpenConverted);
    const formatedHourOpen = formatHours(dateOpenConverted);

    const formatedDateDelivery = formatDate(dateDeliveryConverted);
    const formatedHourDelivery = formatHours(dateDeliveryConverted);

    const formatedDateToRecall = formatDate(dateToRecallConverted);
    const formatedHourToRecall = formatHours(dateToRecallConverted);

    function navigateToEditSolicitacionPageUser() {
        navigation.navigate("editSolicitacionPageUser", {
            solicitacion: props,
            refresh: false
        });
    }

    function padTo2Digits(number:number) {
        return number.toString().padStart(2, '0');
      }
      
    function formatDate(date:Date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }
    
    function formatHours(hours:Date) {
        return [
          padTo2Digits(hours.getHours()),
          padTo2Digits(hours.getMinutes())
        ].join(':');
    }

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.column1}>
                    <Text style={{fontWeight: 'bold'}}>Status</Text>
                    <View style={styles.statusBorder}>
                        <Status
                            status={props.statusSolicitacion.toLowerCase()}
                        />
                    </View>
                </View>
                <View style={styles.column2}>
                    <Text style={styles.label}>Data de abertura:</Text>
                    <Text>{formatedDateOpen} - {formatedHourOpen}h</Text>
                    <Text style={styles.label}>Data para entrega:</Text>
                    <Text>{formatedDateDelivery} - {formatedHourDelivery}h</Text>
                    <Text style={styles.label}>Data para recolhimento:</Text>
                    <Text>{formatedDateToRecall} - {formatedHourToRecall}h</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.label}>Total de items: </Text>
                        <Text style={{color: '#42c9db', fontWeight: 'bold'}}>{props.totalItems}</Text>
                    </View>
                </View>
                <View style={styles.column3}>
                    <TouchableOpacity
                        onPress={navigateToEditSolicitacionPageUser}
                    >
                        <Image source={infoIconImage} style={styles.infoButtom}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 155,
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginTop: 10
    },
    statusBorder: {
        padding: 4,
        backgroundColor: '#fff',
        borderRadius: 30,
        width: 58,
        height: 58
    },
    infoButtom: {
        width: 50,
        height: 50
    },
    column1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 5,
        borderRadius: 10
    },
    column2: {
        flexDirection: 'column',
        width: "65%",
        paddingLeft: 10
    },
    column3: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "17%",
    },
    label: {
        fontWeight: 'bold'
    }
});