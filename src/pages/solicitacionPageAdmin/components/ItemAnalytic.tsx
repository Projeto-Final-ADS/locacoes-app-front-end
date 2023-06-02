import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

interface Props {
    item: any;
}

const currencyFormatter = require('currency-formatter');

export default function ItemAnalytic({...props}: Props) {

    return(
        
        <View style={styles.container}>

            <View style={styles.index}>
                <Text style={{fontWeight: "bold", fontSize: 20}}>{props.item.index}º</Text>
            </View>

            <View>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Item: </Text>
                    <Text
                        numberOfLines={1}
                        style={{width: Dimensions.get('screen').width - 130}}
                    >
                        {props.item.produto.nome}
                    </Text>
                </View>

                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Quantidade: </Text>
                    <Text>{props.item.qtdTotalLocado}</Text>
                </View>

                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Total: </Text>
                    <Text>{currencyFormatter.format(props.item.valorTotalLocado, { code: 'BRL' })}</Text>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width - 40,
        height: 80,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    index: {
        width: 60,
        height: 60,
        backgroundColor: "#baebae",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    label: {
        fontWeight: 'bold'
    }
});