import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { Status } from './Status';

const infoIconImage = require('../../../../../resources/icons/info-icon.png');

interface Solicitacion {
    dateOpen?: Date;
    dateDelivery?: Date;
    totalItems?: number;
    solicitacionID?: number;
}

export function Solicitacion(props: Solicitacion) {
    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.column1}>
                    <Text style={{fontWeight: 'bold'}}>Status</Text>
                    <View style={styles.statusBorder}>
                        <Status
                            status='Aceito'
                        />
                    </View>
                </View>
                <View style={styles.column2}>
                    <Text>Data de abertura:</Text>
                    <Text>01/10/2025 - 17:00h</Text>
                    <Text>Data para entrega:</Text>
                    <Text>06/10/2025 - 14:00h</Text>
                    <Text>Total de items: {10}</Text>
                </View>
                <View style={styles.column3}>
                    <TouchableOpacity>
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
        height: 120,
        backgroundColor: '#f0f0f0',
        padding: 10
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
    }
});