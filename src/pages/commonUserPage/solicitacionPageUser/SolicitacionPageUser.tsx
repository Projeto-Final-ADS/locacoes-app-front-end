import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    FlatList
} from 'react-native';
import { Navbar } from '../../../components/pagesComponents/Navbar';
import { Solicitacion } from './components/Solicitacion';

export function SolicitacionPageUser() {
    return(
        <ScrollView style={styles.page}>
            <KeyboardAvoidingView
                behavior="position"
                enabled
                keyboardVerticalOffset={-240}
            >
                <Navbar/>

                {/*
                <FlatList
                    data={}
                    showsVerticalScrollIndicator ={false}
                    renderItem={}
                    ListFooterComponent={<View style={{height:300}}></View>} //Adiciona espaço abaixo do Flatlist
                />
                */}
                
                <Solicitacion/>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    }
});