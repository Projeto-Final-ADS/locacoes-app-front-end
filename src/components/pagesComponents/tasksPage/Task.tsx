import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
import { Status } from './Status';

interface props {
    task: any;
}

export function Task({...props}: props) {

    return (
        <View style={styles.container}>

            <Status status={props.task.status}/>

            <View style={styles.properties}>

                <Text style={styles.textLabel}>Cliente</Text>
                    <Text numberOfLines={1} style={{width: 250}}>{props.task.clientNameTask}</Text>

                <Text style={styles.textLabel}>Data Entrega</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{props.task.deliverDate}</Text>
                        <Text style={styles.hour}>{props.task.deliverHour}h</Text>
                    </View>
                <Text style={styles.textLabel}>Data Recolhimento</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{props.task.toRecallDate}</Text>
                        <Text style={styles.hour}>{props.task.toRecallHour}h</Text>
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
    }
});