import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';

import { Status } from './Status';
import { useNavigation } from '@react-navigation/native';

interface props {
    task: any;
}

interface Location {
    username?: string;
    locationId?: number;
    address?: any;
    statusLocation?: string;
    productPerLocation: string;
}

export function Task({...props}: props) {

    const navigation = useNavigation();

    const dateDeliveryConverted = new Date(props.task.dataDoEvento);
    const dateToRecallConverted = new Date(props.task.dataRecolhimentoLocacao);

    const formatedDateDelivery = formatDate(dateDeliveryConverted);
    const formatedHourDelivery = formatHours(dateDeliveryConverted);

    const formatedDateToRecall = formatDate(dateToRecallConverted);
    const formatedHourToRecall = formatHours(dateToRecallConverted);

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

    function NavigateEditLocationPage() {
        const location:Location = {
            locationId: props.task.id,
            statusLocation: props.task.statusDaLocacao,
            address: props.task.enderecoDoEvento,
            username: props.task.usuarioQueSolicitou,
            productPerLocation: props.task.produtoPorLocacao
        }
        navigation.navigate("editLocationPage", {location: location, refresh: false});
    }

    return (
        <View style={styles.container}>

            <Status
                onPress={NavigateEditLocationPage}
                status={props.task.statusDaLocacao}
            />
        
            <View style={styles.properties}>

                <Text style={styles.textLabel}>Cliente</Text>
                    <Text numberOfLines={1} style={{width: 250}}>{props.task.usuarioQueSolicitou}</Text>

                <Text style={styles.textLabel}>Data Entrega</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{formatedDateDelivery}</Text>
                        <Text style={styles.hour}>{formatedHourDelivery}h</Text>
                    </View>
                <Text style={styles.textLabel}>Data Recolhimento</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{formatedDateToRecall}</Text>
                        <Text style={styles.hour}>{formatedHourToRecall}h</Text>
                    </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 140,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10
    },
    status: {
        backgroundColor: "#2FB176",
        width: "25%"
    },
    properties: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    textLabel: {
        fontWeight: 'bold',
        fontSize: 16
    },
    hour: {
        color: "#3fc0d1",
        marginLeft: 12,
        fontWeight: 'bold'
    },
    infoButtom: {
        width: 50,
        height: 50
    },
});