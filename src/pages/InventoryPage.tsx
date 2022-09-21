import React from "react";

import {
    View, StyleSheet, Text, Pressable, FlatList
} from 'react-native';

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { InventoryItem } from "../components/pagesComponents/inventoryPage/InventoryItem";
import { Navbar } from "../components/pagesComponents/Navbar";

const data = [
    {itemName: 'Mesa', amount: 23, key: 1},
    {itemName: 'Cadeira', amount: 104, key: 2},
    {itemName: 'Garfo', amount: 140, key: 3},
    {itemName: 'Prato', amount: 63, key: 4},
    {itemName: 'Mesa de madeira', amount: 8, key: 5},
    {itemName: 'Sombrite', amount: 12, key: 6},
    {itemName: 'Forro de mesa', amount: 80, key: 7},
    {itemName: 'Panela de pressão', amount: 6, key: 8},
    {itemName: 'Tacho', amount: 4, key: 10},
    {itemName: 'Colher', amount: 44, key: 11},
];

export function InventoryPage() {
    return (
        <>
            <Navbar/>
            {/*Input para pesquisa de item no estoque*/}
            <View style={styles.inputSearch}>
                <CustomInputText placeholder="Pesquisar"/>
            </View>
            <View style={styles.inventoryBar}>
                {/*Texto de estoque*/}
                <Text style={styles.title}>Estoque</Text>
                
                {/*Botão para adicionar estoque*/}
                <Pressable style={styles.buttonAdd}>
                    <Text style={styles.textButtonAdd}>+</Text>
                </Pressable>
            </View>
            
            {/*Lista de estoque*/}
            <View style={styles.container}>
                <FlatList
                    style={{marginRight: -18, maxHeight: '85%'}}
                    data={data}
                    showsVerticalScrollIndicator ={false}
                    renderItem={
                        ({item}) => (
                            <InventoryItem itemName={item.itemName} ItemAmount={item.key} />
                        )}
                />
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