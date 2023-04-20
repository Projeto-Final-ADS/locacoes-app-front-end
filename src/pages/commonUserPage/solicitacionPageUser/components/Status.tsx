import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

interface props {
    status: string;
}

export function Status(props:props) {
    return(
        <>
            { props.status == "Aceito" &&
                <View style={styles.statusOk}/>
            }
            { props.status == "Pendente" &&
                <View style={styles.statusPending}/>
            }
            { props.status == "Cancelado" &&
                <View style={styles.statusCanceled}/>
            }
            
        </>
    );
}

const styles = StyleSheet.create({
    statusOk: {
        backgroundColor: "#2FB176",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: 50,
        height: 50
    },
    statusPending: {
        backgroundColor: "#ffdd00",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: 50,
        height: 50
    },
    statusCanceled: {
        backgroundColor: "#ff3d3d",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: 50,
        height: 50
    }
});