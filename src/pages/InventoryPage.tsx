import React from "react";

import {
    View, StyleSheet, Text, Pressable
} from 'react-native';

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { InventoryItem } from "../components/pagesComponents/inventoryPage/InventoryItem";
import { Navbar } from "../components/pagesComponents/Navbar";

export function InventoryPage() {
    return (
        <>
            <Navbar/>
            <View style={styles.inputSearch}>
                <CustomInputText placeholder="Pesquisar"/>
            </View>
            <View style={styles.inventoryBar}>
                <Text style={styles.title}>Estoque</Text>
                <Pressable style={styles.buttonAdd}>
                    <Text style={styles.textButtonAdd}>+</Text>
                </Pressable>
            </View>
            
            <View style={styles.container}>
                <InventoryItem/>
                <InventoryItem/>
                <InventoryItem/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20
    },
    inputSearch: {
        alignItems: 'center'
    },
    inventoryBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 45
    },
    buttonAdd: {
        backgroundColor: '#2FB176',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 20,
        marginRight: 20
    },
    textButtonAdd: {
        fontSize: 30,
        color: '#fff'
    }
});